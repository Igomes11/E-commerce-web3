import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClienteModule } from './cliente/cliente.module';
import { EnderecoModule } from './endereco/endereco.module';

@Module({
  imports: [
    // 1. Configura o módulo de ambiente para ler o .env
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    
    // 2. Configura o TypeORM de forma assíncrona (prática recomendada)
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: configService.get<any>('DATABASE_TYPE'), 
        host: configService.get<string>('DATABASE_HOST'), 
        // CORREÇÃO: Usamos '?? 3306' para garantir que haja um valor string para parseInt
        port: parseInt(configService.get<string>('DATABASE_PORT') ?? '3306', 10), 
        username: configService.get<string>('DATABASE_USERNAME'), 
        password: configService.get<string>('DATABASE_PASSWORD'), 
        database: configService.get<string>('DATABASE_NAME'), 
        
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true, // Apenas para desenvolvimento
      }),
    }),

    // Módulos da aplicação
    ClienteModule,
    EnderecoModule,
  ],
})
export class AppModule {}