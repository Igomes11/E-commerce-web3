import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import { Cliente } from './entities/cliente.entity';

@Module({
  // Registra a entidade Cliente para que o Service possa injetar o repositório
  imports: [TypeOrmModule.forFeature([Cliente])], 
  controllers: [ClienteController],
  providers: [ClienteService],
  // Exporta o serviço para ser usado em outros módulos (ex: Pedido)
  exports: [ClienteService, TypeOrmModule], 
})
export class ClienteModule {}