import { Controller, Get, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(@Res() res: any) {
    res.status(302).redirect('https://proxy-server-khao.onrender.com/login')
  }

  @Post()
  getMess() {
    return 'Hi'
  }
}
