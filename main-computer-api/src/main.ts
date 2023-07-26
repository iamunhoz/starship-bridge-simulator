import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      // impede que dados não declarados nos dtos sejam recebidos pelos endpoints
      whitelist: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Starship Main Computer')
    .setDescription('The main computer API routes')
    .setVersion('1.0')
    .addTag('starship')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3333);
}
bootstrap();
