import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnderecoService } from './endereco.service';
import { EnderecoController } from './endereco.controller';
import { Endereco } from './entities/endereco.entity';
import { Cliente } from '../cliente/entities/cliente.entity'; // Importa Cliente

@Module({
  // Registra Endereco e Cliente, pois o EnderecoService precisa de ambos
  imports: [TypeOrmModule.forFeature([Endereco, Cliente])],
  controllers: [EnderecoController],
  providers: [EnderecoService],
  exports: [EnderecoService, TypeOrmModule],
})
export class EnderecoModule {}
