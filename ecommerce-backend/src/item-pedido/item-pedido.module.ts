import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemPedidoService } from './item-pedido.service';
import { ItemPedidoController } from './item-pedido.controller';
import { ItemPedido } from './entities/item-pedido.entity';
import { Produto } from '../produto/entities/produto.entity';

@Module({
  // ItemPedido precisa de Produto para verificar estoque/preço
  imports: [TypeOrmModule.forFeature([ItemPedido, Produto])], 
  controllers: [ItemPedidoController], 
  providers: [ItemPedidoService], 
  exports: [ItemPedidoService, TypeOrmModule], 
})
export class ItemPedidoModule {}