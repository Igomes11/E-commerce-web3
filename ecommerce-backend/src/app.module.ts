import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config'; 
import { ClienteModule } from './cliente/cliente.module'; 
import { EnderecoModule } from './endereco/endereco.module'; // Importa EnderecoModule

@Module({
  imports: [
    // 1. Configura o módulo de ambiente para ler o .env
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    
    // 2. Configura a Conexão com o Banco de Dados (TypeORM) de forma assíncrona
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], 
      inject: [ConfigService], 
      useFactory: (configService: ConfigService) => ({
        // Tipos de dados garantidos pelo ConfigService
        type: configService.get<any>('DATABASE_TYPE'), 
        host: configService.get<string>('DATABASE_HOST')!, 
        
        // Trata a porta com segurança, fornecendo um fallback e convertendo para número
        port: parseInt(configService.get<string>('DATABASE_PORT') || '3306', 10), 

        username: configService.get<string>('DATABASE_USERNAME')!, 
        password: configService.get<string>('DATABASE_PASSWORD')!, 
        database: configService.get<string>('DATABASE_NAME')!, 
        
        // Localiza todas as entidades da aplicação
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true, // Auto-cria tabelas (ideal para desenvolvimento)
      }),
    }),

    // Módulos da Aplicação
    ClienteModule,
    EnderecoModule, 
  ],
})
export class AppModule {}
