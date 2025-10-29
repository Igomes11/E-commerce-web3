import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidosService } from './pedidos.service';
import { Pedido } from './entities/pedido.entity';
import { ItemPedido } from '../item-pedidos/entities/item-pedido.entity';
import { Cliente } from '../clientes/entities/cliente.entity'; 
import { Produto } from '../produtos/entities/produto.entity';
import { PedidosController } from './pedidos.controller'; 


@Module({
  imports: [
    TypeOrmModule.forFeature([
      Pedido,
      ItemPedido,
      Cliente, // Adicionado
      Produto, // Adicionado
    ]),
  ],
  controllers: [PedidosController],
  providers: [PedidosService],
})
export class PedidosModule {}