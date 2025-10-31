import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidosService } from './pedidos.service';
import { PedidosController } from './pedidos.controller';
import { Pedido } from './entities/pedido.entity';
import { ItemPedido } from '../item-pedidos/entities/item-pedido.entity';
import { Cliente } from '../clientes/entities/cliente.entity';
import { Produto } from '../produtos/entities/produto.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Pedido,
      ItemPedido,
      Cliente,
      Produto,
    ]),
  ],
  controllers: [PedidosController],
  providers: [PedidosService],
})
export class PedidosModule {}
