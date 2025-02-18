import { Controller } from '@nestjs/common';
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
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private readonly userService: UserService) {}

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

  @Get('outfits/bridal')
  async getOutfitByTypeBridal() {
    return this.userService.getOutfitByTypeBridal();
  }

  @Get('outfits/traditional')
  async getOutfitByTypeTraditional() {
    return this.userService.getOutfitByTypeTraditional();
  }

  @Get('outfits/party')
  async getOutfitByTypeParty() {
    return this.userService.getOutfitByTypeParty();
  }

  @Get('jewellery/:jewelleryId')
  async getJewelleryById(@Param('jewelleryId') jewelleryId: string) {
    return this.userService.getJewelleryById(jewelleryId);
  }

  @Get('alljewellery')
  async getAllJewellery() {
    return this.userService.getAllJewelleryItems();
  }

  @Post('createappointment/:itemType/:itemId')
  async createAppointment(
    @Request() req,
    @Body() body,
    @Param('itemType') itemType: 'outfit' | 'jewellery',
    @Param('itemId') itemId: string
  ) { 
    console.log('req.user', req.user.id);
    return this.userService.bookAppointment(itemType, itemId, req.user.id, body);
  }
}
