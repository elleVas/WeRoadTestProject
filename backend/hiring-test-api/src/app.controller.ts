import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test-env')
  testEnv() {
    const dbHost = this.configService.get<string>('DB_HOST');
    return {
      DB_HOST: dbHost,
      NODE_ENV: process.env.NODE_ENV,
    };
  }
}
