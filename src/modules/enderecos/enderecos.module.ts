import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Endereco } from './entities/endereco.entity';
import { Cliente } from '../clientes/entities/cliente.entity';
import { EnderecosService } from './enderecos.service';
import { EnderecosController } from './enderecos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Endereco, Cliente])],
  controllers: [EnderecosController],
  providers: [EnderecosService],
})
export class EnderecosModule {}
