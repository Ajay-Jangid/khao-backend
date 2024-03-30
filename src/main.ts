import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsMiddleware } from './cors.middleware';
import { ImATeapotException } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const whitelist = [
    'http://localhost:1234',
    'https://khao.vercel.app'
  ]
  app.enableCors({
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
    origin: function (origin, callback) {
      if (!origin) {
        callback(null, true)
        return;
      }
      if (whitelist.includes(origin)) {
        callback(null, true);
      } else {
        callback(new ImATeapotException('Not allowed by CORS'), false)
      }
    }
  });
  await app.listen(3000);
}
bootstrap();
