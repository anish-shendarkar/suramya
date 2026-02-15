import { AuthService } from './auth/auth.service';
import { Controller, Get, Post, UseGuards, Request, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('api')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/login')
  @UseGuards(AuthGuard('local'))
  // test change for deployment
  async login(@Request() req) {
    console.log('appcontrollerlogin', req.user);
    const user = req.user;

    // remove user.password;
    delete user.password;

    // const user = "dbhfgijdebgjhd";
    return await this.authService.generateToken(user);
  }
}
