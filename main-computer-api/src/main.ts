import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      // impede que dados não declarados nos dtos sejam recebidos pelos endpoints
      whitelist: true,
    }),
  );
  await app.listen(3333);
}
bootstrap();
