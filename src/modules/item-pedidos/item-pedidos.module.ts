import { Module } from '@nestjs/common';
import { ItemPedidosService } from './item-pedidos.service';
import { ItemPedidosController } from './item-pedidos.controller';

@Module({
  controllers: [ItemPedidosController],
  providers: [ItemPedidosService],
})
export class ItemPedidosModule {}
