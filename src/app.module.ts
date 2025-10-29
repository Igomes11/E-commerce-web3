import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriasModule } from './modules/categorias/categorias.module';
import { ProdutosModule } from './modules/produtos/produtos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from './modules/produtos/entities/produto.entity';
import { Categoria } from './modules/categorias/entities/categoria.entity';
import { ConfigModule } from '@nestjs/config';
import { ClientesModule } from './modules/clientes/clientes.module';
import { PagamentosModule } from './modules/pagamentos/pagamentos.module';
import { EnderecosModule } from './modules/enderecos/enderecos.module';
import { PedidosModule } from './modules/pedidos/pedidos.module';
import { Cliente } from './modules/clientes/entities/cliente.entity';
import { Endereco } from './modules/enderecos/entities/endereco.entity';
import { Pedido } from './modules/pedidos/entities/pedido.entity';
import { Pagamento } from './modules/pagamentos/entities/pagamento.entity';
import { ItemPedido } from './modules/item-pedidos/entities/item-pedido.entity';



@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true, envFilePath: 'teste.env'}),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '3306', 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Produto, Categoria, Cliente, Endereco, Pedido, Pagamento, ItemPedido],
      synchronize: true,
    }),
    CategoriasModule,
    ProdutosModule,
    ClientesModule,
    EnderecosModule,
    PedidosModule,
    PagamentosModule,
  ],
  controllers: [AppController],
  providers: [AppService
  ],
})
export class AppModule {}
