import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsMiddleware } from './cors.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors:true});
  app.enableCors()
  app.use(CorsMiddleware);
  await app.listen(3000);
}
bootstrap();
