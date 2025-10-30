import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilita o CORS para permitir requisições do frontend (porta 5173)
  // Isso resolve o erro "CORS error"
  app.enableCors({
    origin: 'http://localhost:5173', // Endereço do seu Front-end React
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos HTTP permitidos
    credentials: true,
  });

  // Usa a porta do .env (3000) ou 3000 como padrão
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();