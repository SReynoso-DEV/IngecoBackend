import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import bodyParser = require('body-parser');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.setGlobalPrefix('api');
  await app.listen(4000);
}
bootstrap();
