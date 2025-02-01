import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Req,
  UseInterceptors,
  UploadedFiles
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'fs';
import * as path from 'path';

@Controller('admin')
@UseGuards(AuthGuard('jwt'))
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @Get()
  userCheck() {
    return { message: 'admin check' };
    // return this.userService.findAll();
  }

  @Post('createoutfit')
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const uploadPath = 'uploads/outfits';
          if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
          }
          cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + path.extname(file.originalname));
        },
      }),
    })
  )
  async createOutfit(@Body() body, @UploadedFiles() files: Array<Express.Multer.File>, @Request() req) {
    const imagePaths = files.map(file => file.filename);
    const coverImage = imagePaths.length > 0 ? imagePaths[0] : null;

    return this.adminService.createOutfit(
      req.user.user,
      body,
      coverImage,
      imagePaths,
    );
  }

  @Get('getoutfits')
  async getAllOutfits() {
    return this.adminService.getAllOutfits();
  }

  @Get('getoutfit/:outfitId')
  async getOutfitById(@Param('outfitId') outfitId) {
    return this.adminService.getOutfitById(outfitId);
  }
}
