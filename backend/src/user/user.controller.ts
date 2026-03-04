import { Controller, Query } from '@nestjs/common';
import { UserService } from './user.service';
import {
  Get,
  Param,
} from '@nestjs/common'

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
  async getOutfitByGenderMale(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10'
  ) {
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    return this.userService.getOutfitByGenderMale(pageNum, limitNum);
  }

  @Get('outfits/female')
  async getOutfitByGenderFemale(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10'
  ) {
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    return this.userService.getOutfitByGenderFemale(pageNum, limitNum);
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
  async getAllJewellery(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10'
  ) {
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    return this.userService.getAllJewelleryItems(pageNum, limitNum);
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

  @Get('categories/male')
  async getMenOutfitsType() {
    return this.userService.fetchMenOutfitsType();
  }

  @Get('categories/female')
  async getWomenOutfitsType() {
    return this.userService.fetchWomenOutfitsType();
  }
}
