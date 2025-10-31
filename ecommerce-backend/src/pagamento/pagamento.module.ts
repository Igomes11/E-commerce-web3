// Caminho: ecommerce-backend/src/pagamento/pagamento.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PagamentoService } from './pagamento.service';
import { PagamentoController } from './pagamento.controller';
import { Pagamento } from './entities/pagamento.entity';
import { Pedido } from '../pedido/entities/pedido.entity';
import { Produto } from '../produto/entities/produto.entity';
import { ItemPedido } from '../item-pedido/entities/item-pedido.entity';

@Module({
  imports: [
    // Registra todas as Entidades necessárias para o Service
    TypeOrmModule.forFeature([Pagamento, Pedido, Produto, ItemPedido]),
  ],
  controllers: [PagamentoController],
  providers: [PagamentoService],
  exports: [PagamentoService],
})
export class PagamentoModule {}