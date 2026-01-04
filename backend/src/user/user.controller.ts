import { Controller, Query } from '@nestjs/common';
import { UserService } from './user.service';
import {
  Get,
  Post,
  Body,
  Patch,
  Put,
  Param,
  Delete,
  UseGuards,
  Request,
  Req,
  UseInterceptors,
  UploadedFiles
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/role.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  async userCheck() {
    return { message: 'user check' };
  }

  @Get('outfit/:outfitId')
  async getOutfitById(@Param('outfitId') outfitId: string) {
    return this.userService.getOutfitById(outfitId);
  }

  @Get('outfits/male')
  async getOutfitByGenderMale() {
    return this.userService.getOutfitByGenderMale();
  }

  @Get('outfits/female')
  async getOutfitByGenderFemale() {
    return this.userService.getOutfitByGenderFemale();
  }

  @Get('outfits/:category')
  async getOutfitBycategory(@Param('category') category: string) {
    return this.userService.getOutfitBycategory(category);
  }

  @Get('jewellery/:jewelleryId')
  async getJewelleryById(@Param('jewelleryId') jewelleryId: string) {
    return this.userService.getJewelleryById(jewelleryId);
  }

  @Get('alljewellery')
  async getAllJewellery() {
    return this.userService.getAllJewelleryItems();
  }

  @Get('search/outfit')
  async search(@Query('query') query: string) {
    return this.userService.searchOutfit(query);
  }

  @Get('search/jewellery')
  async searchJewellery(@Query('query') query: string) {
    return this.userService.searchJewellery(query);
  }

  @Get('newarrivals')
  async getNewArrivals() {
    return this.userService.getNewArrivals();
  }

  @Get('popularoutfits')
  async getPopularOutfits() {
    return this.userService.getPopularOutfits();
  }
}
