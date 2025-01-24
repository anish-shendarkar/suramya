import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Req } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from '../role.guard';
import * as fs from 'fs';

@Controller('admin')
@UseGuards(AuthGuard('jwt'), new RoleGuard('admin'))
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  userCheck() {
    return { message: 'admin check' };
    // return this.userService.findAll();
  }

  @Post('createoutfit')
  async createOutfit(@Body() body, @Request() req) {
    return this.adminService.createOutfit(req.user.user, body);
  }

  @Get('getoutfits')
  async getAllOutfits() {
    return this.adminService.getAllOutfits();
  }
}
