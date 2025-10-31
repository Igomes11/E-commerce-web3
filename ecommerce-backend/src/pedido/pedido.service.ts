import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido, PedidoStatus } from './entities/pedido.entity';
import { Cliente } from '../cliente/entities/cliente.entity';
import { Endereco } from '../endereco/entities/endereco.entity';
import { Produto } from '../produto/entities/produto.entity';
import { ItemPedido } from '../item-pedido/entities/item-pedido.entity';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { ItemPedidoService } from '../item-pedido/item-pedido.service';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(Pedido)
    private pedidoRepository: Repository<Pedido>,
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
    @InjectRepository(Endereco)
    private enderecoRepository: Repository<Endereco>,
    @InjectRepository(Produto) 
    private produtoRepository: Repository<Produto>, 
    
    private readonly itemPedidoService: ItemPedidoService,
  ) {}

  async create(createPedidoDto: CreatePedidoDto): Promise<Pedido> {
    const { clienteId, enderecoId, itens: itensDto } = createPedidoDto;

    // 1. Validação de Entidades base
    const cliente = await this.clienteRepository.findOne({ where: { id: clienteId } });
    if (!cliente) { throw new NotFoundException(`Cliente com ID ${clienteId} não encontrado.`); }

    const endereco = await this.enderecoRepository.findOne({ where: { id: enderecoId } });
    if (!endereco) { throw new NotFoundException(`Endereço com ID ${enderecoId} não encontrado.`); }
    
    // 2. Prepara o Pedido (Status AGUARDANDO_PAGAMENTO)
    const novoPedido = this.pedidoRepository.create({
      cliente,
      endereco,
      status: PedidoStatus.AGUARDANDO_PAGAMENTO,
      dataCriacao: new Date(),
    });

    // 3. Processa e valida os itens, verificando o estoque
    const itensEntityPromises = itensDto.map(itemDto => 
      this.itemPedidoService.createItem(novoPedido, itemDto)
    );
    
    const itensEntity = await Promise.all(itensEntityPromises);

    // 4. Calcula Totais
    let subtotalGeral = 0;
    let quantidadeTotal = 0;

    itensEntity.forEach(item => {
      subtotalGeral += item.subtotal;
      quantidadeTotal += item.quantidade;
    });

    // Atualiza o objeto Pedido
    novoPedido.subtotal = subtotalGeral;
    novoPedido.total = subtotalGeral; 
    novoPedido.quantidadeTotal = quantidadeTotal;
    novoPedido.itens = itensEntity;

    // 5. Salva Pedido e Itens
    return this.pedidoRepository.save(novoPedido);
  }

  async findOne(id: number): Promise<Pedido> {
    const pedido = await this.pedidoRepository.findOne({
      where: { id },
      relations: ['cliente', 'endereco', 'itens', 'itens.produto'], 
    });
    if (!pedido) {
      throw new NotFoundException(`Pedido com ID ${id} não encontrado.`);
    }
    return pedido;
  }

  async findAllByCliente(clienteId: number): Promise<Pedido[]> {
    return this.pedidoRepository.find({
      where: { cliente: { id: clienteId } },
      order: { dataCriacao: 'DESC' },
      relations: ['endereco', 'itens', 'itens.produto'],
    });
  }

  async updateStatus(id: number, newStatus: PedidoStatus): Promise<Pedido> {
    const pedido = await this.findOne(id);
    
    if (pedido.status === PedidoStatus.CANCELADO) {
        throw new BadRequestException('Não é possível alterar o status de um pedido cancelado.');
    }

    pedido.status = newStatus;
    return this.pedidoRepository.save(pedido);
  }
}
