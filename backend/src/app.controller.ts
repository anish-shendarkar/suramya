import { AuthService } from './auth/auth.service';
import { Controller, Get, Post, UseGuards, Request, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { AdminService } from './admin/admin.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
    private readonly adminService: AdminService,
    private readonly userService: UserService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/signup')
  async signup(@Request() req) {
    // required body
    // {
    //   "name": "user1",
    //   "email": "user1@example.com",
    //   "password": "user1"
    // }

    console.log('appsignup', req.body);
    const user = await this.userService.createUser(
      req.body.name,
      req.body.email,
      req.body.password,
      req.body.role,
    );
    return user;
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
