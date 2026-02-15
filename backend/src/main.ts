import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });
  app.enableCors({
    origin: [
      "http://localhost:3000",
      "https://suramya.com"
    ],
    credentials: true, 
  });
  const port = process.env.PORT || 3333;
  await app.listen(port);
  console.log(`Application is running on port ${port}`);
}
bootstrap();
