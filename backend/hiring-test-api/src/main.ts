import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.development.env' }); 

async function bootstrap() {
const app = await NestFactory.create(AppModule);
 // Abilita CORS
  app.enableCors({
    origin: 'http://localhost:3000', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
    credentials: false,
  });
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
