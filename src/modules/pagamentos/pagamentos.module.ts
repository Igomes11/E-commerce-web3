import { Module } from '@nestjs/common';
import { PagamentosService } from './pagamentos.service';
import { PagamentosController } from './pagamentos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pagamento } from './entities/pagamento.entity';
import { Pedido } from '../pedidos/entities/pedido.entity';
import { Produto } from '../produtos/entities/produto.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Pagamento,
      Pedido,
      Produto
    ])
  ],
  controllers: [PagamentosController],
  providers: [PagamentosService],
})
export class PagamentosModule {}
