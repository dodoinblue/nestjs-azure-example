import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    console.log('Hello from Azure Function');
    return this.appService.getHello();
  }

  @Get('health')
  getHealth() {
    console.log('Health from Azure Function');
    return { message: 'OK' };
  }

  @Post('echo')
  postEcho(@Body() body: any) {
    console.log('Health from Azure Function');
    return body;
  }
}
