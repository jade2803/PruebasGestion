import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SERVER_PORT } from './config/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = +configService.get<number>(SERVER_PORT) || 3000;

  // Habilitar CORS
  app.enableCors({
    origin: ['http://localhost:4200'], // Permite el origen del frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization', // Asegúrate de que los encabezados sean permitidos
    credentials: true,  // Permite que se envíen cookies o encabezados de autenticación
    preflightContinue: false,  // No continuar con la solicitud después del preflight
  });

  await app.listen(port);
}

bootstrap();
