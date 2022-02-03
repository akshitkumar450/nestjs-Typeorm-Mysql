import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// to import cookie session use this only not import(typescript configuration)
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // middleware for cookie-session
  app.use(
    cookieSession({
      keys: ['super-secret'],
    }),
  );
  // for handling the validation of data by requests(post,patch)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // to automatically delete fields which are not mentioned in DTO from the incoming request
    }),
  );
  await app.listen(3000);
}
bootstrap();
