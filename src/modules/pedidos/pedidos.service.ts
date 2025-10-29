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
    @InjectRepository(Pedido) private pedidoRepo: Repository<Pedido>,
    @InjectRepository(ItemPedido) private itemRepo: Repository<ItemPedido>,
    @InjectRepository(Cliente) private clienteRepo: Repository<Cliente>,
    @InjectRepository(Produto) private produtoRepo: Repository<Produto>,
  ) {}

  async create(dto: CreatePedidoDto) {
    const cliente = await this.clienteRepo.findOne({ where: { id: dto.clienteId } });
    if (!cliente) throw new NotFoundException('Cliente não encontrado');

    let total = 0;
    const itens: ItemPedido[] = [];

    for (const itemDto of dto.itens) {
      const produto = await this.produtoRepo.findOne({ where: { id: itemDto.produtoId } });
      if (!produto) throw new NotFoundException(`Produto ${itemDto.produtoId} não encontrado`);
      if (produto.estoque < itemDto.quantidade)
        throw new BadRequestException(`Estoque insuficiente para ${produto.nome}`);

      const subtotal = Number(produto.preco) * itemDto.quantidade;
      total += subtotal;
      itens.push(this.itemRepo.create({ produto, quantidade: itemDto.quantidade, subtotal }));
    }

    const pedido = this.pedidoRepo.create({
      cliente,
      itens,
      total,
      status: 'AGUARDANDO_PAGAMENTO',
    });

    return this.pedidoRepo.save(pedido);
  }

  findAll() {
    return this.pedidoRepo.find({ relations: ['cliente', 'itens'] });
  }

  findOne(id: string) {
    return this.pedidoRepo.findOne({ where: { id }, relations: ['cliente', 'itens'] });
  }

  async cancel(id: string) {
    const pedido = await this.findOne(id);
    if (!pedido) throw new NotFoundException();
    pedido.status = 'CANCELADO';
    return this.pedidoRepo.save(pedido);
  }
  async update(id: string, updatePedidoDto: UpdatePedidoDto) {
    const pedido = await this.findOne(id);
    if (!pedido) throw new NotFoundException('Pedido não encontrado');
    
    return this.pedidoRepo.save({ ...pedido, ...updatePedidoDto });
  }

  async remove(id: string) {
    const pedido = await this.findOne(id);
    if (!pedido) throw new NotFoundException('Pedido não encontrado');
    
    return this.pedidoRepo.remove(pedido);
  }
}
