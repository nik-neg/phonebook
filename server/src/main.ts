import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GraphqlExceptionFilter } from './exception/graphql-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalFilters(new GraphqlExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));

  await app.listen(3001);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
