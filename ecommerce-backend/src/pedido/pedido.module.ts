import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidoService } from './pedido.service';
import { PedidoController } from './pedido.controller';
import { Pedido } from './entities/pedido.entity';
import { Cliente } from '../cliente/entities/cliente.entity';
import { Endereco } from '../endereco/entities/endereco.entity';
import { Produto } from '../produto/entities/produto.entity';
import { ItemPedidoModule } from '../item-pedido/item-pedido.module';
import { ItemPedido } from '../item-pedido/entities/item-pedido.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Pedido,
      Cliente,
      Endereco,
      Produto,
      ItemPedido
    ]),
    ItemPedidoModule,
  ],
  controllers: [PedidoController],
  providers: [PedidoService],
  exports: [PedidoService],
})
export class PedidoModule {}