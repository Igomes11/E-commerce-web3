import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido } from './entities/pedido.entity';
import { ItemPedido } from '../item-pedidos/entities/item-pedido.entity';
import { Cliente } from '../clientes/entities/cliente.entity';
import { Produto } from '../produtos/entities/produto.entity';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>,

    @InjectRepository(ItemPedido)
    private readonly itemRepository: Repository<ItemPedido>,

    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,

    @InjectRepository(Produto)
    private readonly produtoRepository: Repository<Produto>,
  ) {}

  async create(dto: CreatePedidoDto) {
    const cliente = await this.clienteRepository.findOne({ where: { id: dto.clienteId } });
    if (!cliente) throw new NotFoundException('Cliente não encontrado');

    let total = 0;
    const itens = await Promise.all(
      dto.itens.map(async (item) => {
        const produto = await this.produtoRepository.findOne({ where: { id: item.produtoId } });
        if (!produto) throw new NotFoundException(`Produto ${item.produtoId} não encontrado`);
        if (produto.estoque < item.quantidade)
          throw new BadRequestException(`Estoque insuficiente para ${produto.nome}`);

        const subtotal = Number(produto.preco) * item.quantidade;
        total += subtotal;

        return this.itemRepository.create({ produto, quantidade: item.quantidade, subtotal });
      }),
    );

    const pedido = this.pedidoRepository.create({
      cliente,
      itens,
      total,
      status: 'AGUARDANDO_PAGAMENTO',
    });

    return this.pedidoRepository.save(pedido);
  }

  findAll() {
    return this.pedidoRepository.find({
      relations: ['cliente', 'itens', 'itens.produto'],
      order: { criadoEm: 'DESC' },
    });
  }

  async findOne(id: number) {
    const pedido = await this.pedidoRepository.findOne({
      where: { id },
      relations: ['cliente', 'itens', 'itens.produto'],
    });
    if (!pedido) throw new NotFoundException('Pedido não encontrado');
    return pedido;
  }

  async update(id: number, dto: UpdatePedidoDto) {
    const pedido = await this.findOne(id);
    Object.assign(pedido, dto);
    return this.pedidoRepository.save(pedido);
  }

  async remove(id: number) {
    const pedido = await this.findOne(id);
    return this.pedidoRepository.remove(pedido);
  }
}

