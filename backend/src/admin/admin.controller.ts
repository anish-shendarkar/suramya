import {
  Controller,
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
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'fs';
import * as path from 'path';
import { RoleGuard } from 'src/role.guard';
import cloudinary from 'src/config/cloudinary.config';

@Controller('admin')
@UseGuards(AuthGuard('jwt'), new RoleGuard('admin'))
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @Get()
  userCheck() {
    return { message: 'admin check' };
    // return this.userService.findAll();
  }

  @Post('createoutfit')
  @UseInterceptors(
    FilesInterceptor('images', 10) // memory storage by default
  )
  async createOutfit(
    @Body() body,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Request() req
  ) {
    // Upload each image to Cloudinary
    const uploadedImages = await Promise.all(
      files.map((file) => {
        return new Promise<string>((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            { folder: 'suramya/outfits' },
            (err, result) => {
              if (err) {
                reject(err);
              } else if (result?.secure_url) {
                resolve(result.secure_url)
              }
              else {
                reject(new Error('No secure_url returned from Cloudinary'));
              } // store only URL
            }
          ).end(file.buffer);
        });
      })
    );

    const coverImage = uploadedImages.length > 0 ? uploadedImages[0] : null;
    console.log('create outfit hit', Date.now())

    return this.adminService.createOutfit(
      req.user.user,
      body,
      coverImage,
      uploadedImages
    );
  }


  @Delete('deleteoutfit/:outfitId')
  async deleteOutfit(@Param('outfitId') outfitId, @Request() req) {
    return this.adminService.deleteOutfit(req.user.user, outfitId);
  }

  @Get('getoutfits')
  async getAllOutfits() {
    return this.adminService.getAllOutfits();
  }

  @Get('getoutfit/:outfitId')
  async getOutfitById(@Param('outfitId') outfitId) {
    return this.adminService.getOutfitById(outfitId);
  }

  @Patch('editoutfit/:outfitId')
  @UseInterceptors(FilesInterceptor('images', 10))
  async updateOutfit(
    @Param('outfitId') id: string,
    @Body() body,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {

    // Upload new images if any
    let uploadedImages: string[] = [];

    if (files && files.length > 0) {
      uploadedImages = await Promise.all(
        files.map((file) => {
          return new Promise<string>((resolve, reject) => {
            cloudinary.uploader.upload_stream(
              { folder: 'suramya/outfits' },
              (err, result) => {
                if (err) {
                  reject(err);
                } else if (result?.secure_url) {
                  resolve(result.secure_url);
                } else {
                  reject(new Error('No secure_url returned'));
                }
              }
            ).end(file.buffer);
          });
        })
      );
    }

    // Parse imagesToDelete if sent from frontend
    let imagesToDelete: string[] = [];
    if (body.imagesToDelete) {
      if (typeof body.imagesToDelete === 'string') {
        try {
          imagesToDelete = JSON.parse(body.imagesToDelete);
        } catch {
          // If not JSON, treat it as single URL
          imagesToDelete = [body.imagesToDelete];
        }
      } else {
        imagesToDelete = body.imagesToDelete;
      }
    }

    return this.adminService.updateOutfit(
      id,
      body,
      uploadedImages,
      imagesToDelete,
    );
  }

  @Post('createjewelleryitem')
  @UseInterceptors(
    FilesInterceptor('images', 10) // memory storage by default
  )
  async createJewelleryItem(@Body() body, @UploadedFiles() files: Array<Express.Multer.File>, @Request() req) {
    const uploadedImages = await Promise.all(
      files.map((file) => {
        return new Promise<string>((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            { folder: 'suramya/jewellery' },
            (err, result) => {
              if (err) {
                reject(err);
              } else if (result?.secure_url) {
                resolve(result.secure_url)
              }
              else {
                reject(new Error('No secure_url returned from Cloudinary'));
              } // store only URL
            }
          ).end(file.buffer);
        });
      })
    );

    const coverImage = uploadedImages.length > 0 ? uploadedImages[0] : null;
    console.log('create jewellery item hit', Date.now())

    return this.adminService.createJewelleryItem(
      req.user.user,
      body,
      coverImage,
      uploadedImages
    );
  }

  @Delete('deletejewelleryitem/:jewelleryId')
  async deleteJewelleryItem(@Param('jewelleryId') jewelleryId, @Request() req) {
    console.log('req.user', req.user);
    return this.adminService.deleteJewelleryItem(jewelleryId);
  }

  @Get('getjewelleryitems')
  async getAllJewelleryItems() {
    return this.adminService.getAllJewelleryItems();
  }
}
