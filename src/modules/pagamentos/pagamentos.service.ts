import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pagamento } from './entities/pagamento.entity';
import { Pedido } from '../pedidos/entities/pedido.entity';
import { Produto } from '../produtos/entities/produto.entity';



@Injectable()
export class PagamentosService {
  constructor(
    @InjectRepository(Pagamento) private pagamentoRepo: Repository<Pagamento>,
    @InjectRepository(Pedido) private pedidoRepo: Repository<Pedido>,
    @InjectRepository(Produto) private produtoRepo: Repository<Produto>,
  ) {}

  async criarPagamento(dto: { pedidoId: string; metodo: string }) {
    const pedido = await this.pedidoRepo.findOne({ where: { id: dto.pedidoId }, relations: ['itens'] });
    if (!pedido) throw new NotFoundException('Pedido não encontrado');
    if (pedido.status !== 'AGUARDANDO_PAGAMENTO')
      throw new BadRequestException('Pedido não pode receber pagamento neste status');

    const pagamento = this.pagamentoRepo.create({
      pedido,
      metodo: dto.metodo,
      status: 'PENDENTE',
      valor: pedido.total,
    });

    return this.pagamentoRepo.save(pagamento);
  }

  async confirmarPagamento(id: string) {
    const pagamento = await this.pagamentoRepo.findOne({ where: { id }, relations: ['pedido', 'pedido.itens', 'pedido.itens.produto'] });
    if (!pagamento) throw new NotFoundException('Pagamento não encontrado');

    pagamento.status = 'PAGO';
    pagamento.pedido.status = 'PAGO';

    // Atualiza estoque
    for (const item of pagamento.pedido.itens) {
      const produto = await this.produtoRepo.findOne({ where: { id: item.produto.id } });
      if (!produto) throw new NotFoundException(`Produto ${item.produto.id} não encontrado`);
      produto.estoque -= item.quantidade;
      await this.produtoRepo.save(produto);
    }

    await this.pedidoRepo.save(pagamento.pedido);
    return this.pagamentoRepo.save(pagamento);
  }
}
