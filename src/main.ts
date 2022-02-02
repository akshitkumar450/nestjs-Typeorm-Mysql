import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // for handling the validation of data by requests(post,patch)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // to automatically delete fields which are not mentioned in DTO from the incoming request
    }),
  );
  await app.listen(3000);
}
bootstrap();
