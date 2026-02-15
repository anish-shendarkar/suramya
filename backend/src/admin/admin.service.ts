import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/schemas/user.schema'
import { Outfit } from 'src/schemas/outfit.schema';
import { Jewellery } from 'src/schemas/jewellery.schema';
import { UpdateOutfitDto } from './dto/update-outfit.dto';
import { v2 as cloudinary } from 'cloudinary';
import { CreateOutfitDto } from './dto/create-outfit.dto';
import { CreateJewelleryDto } from './dto/create-jewellery.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Outfit.name) private readonly outfitModel: Model<Outfit>,
    @InjectModel(Jewellery.name) private readonly jewelleryModel: Model<Jewellery>,
  ) { }

  async createUser(name: string, email: string, password: string, role: string) {
    const user = await this.findUserByEmail(email);
    if (user) {
      throw new BadRequestException('User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new this.userModel({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    return newUser;
  }

  async findUserByEmail(email: string) {
    return await this.userModel.findOne({ email: email });
  }

  async createOutfit(user: User, body: CreateOutfitDto, coverImage: string, images: string[]) {

    const outfit = new this.outfitModel({
      name: body.name,
      description: body.description,
      type: body.type.toLowerCase(),
      size: body.size.toLowerCase(),
      color: body.color.toLowerCase(),
      gender: body.gender.toLowerCase(),
      price: body.price,
      coverImage,
      images,
    });

    await outfit.save();
    return outfit;
  }

  async deleteOutfit(user: User, outfitId: string) {
    const outfit = await this.outfitModel.findById(outfitId);
    if (!outfit) {
      throw new BadRequestException('Outfit not found');
    }
    const allImages = [outfit.coverImage, ...outfit.images];
    for (const imageUrl of allImages) {
      const publicId = this.extractPublicId(imageUrl);
      if (publicId) {
        try {
          await cloudinary.uploader.destroy(publicId);
        } catch (error) {
          console.error('Cloudinary delete error:', error);
        }
      }
    }

    await this.outfitModel.deleteOne({ _id: outfitId });
    return { message: 'Outfit deleted successfully' };
  }

  async getAllOutfits() {
    return await this.outfitModel.find().exec();
  }

  async getOutfitById(outfitId: string) {
    return await this.outfitModel.findById(outfitId);
  }

  private extractPublicId(imageUrl: string): string | null {
    try {
      // Example URL: https://res.cloudinary.com/dfedsvalq/image/upload/v1770459176/suramya/outfits/zrh7xmqfspqoaealpyno.jpg
      const parts = imageUrl.split('/');
      const uploadIndex = parts.indexOf('upload');
      if (uploadIndex !== -1) {
        // Get everything after version number
        const pathAfterVersion = parts.slice(uploadIndex + 2).join('/');
        // Remove file extension
        return pathAfterVersion.replace(/\.[^/.]+$/, '');
      }
      return null;
    } catch (error) {
      console.error('Error extracting public_id:', error);
      return null;
    }
  }

  async updateOutfit(
    outfitId: string,
    updateData: UpdateOutfitDto,
    newImageUrls: string[],
    imagesToDelete: string[],
  ) {
    const outfit = await this.outfitModel.findById(outfitId);

    if (!outfit) {
      throw new NotFoundException('Outfit not found');
    }

    if (imagesToDelete && imagesToDelete.length > 0) {
      for (const imageUrl of imagesToDelete) {

        // Extract Cloudinary public_id
        const publicId = this.extractPublicId(imageUrl);

        if (publicId) {
          try {
            await cloudinary.uploader.destroy(publicId);
          } catch (error) {
            console.error('Cloudinary delete error:', error);
          }
        }

        // Remove from images array
        outfit.images = outfit.images.filter(
          (img) => img !== imageUrl,
        );

        // If deleted image was cover image → assign new one
        if (outfit.coverImage === imageUrl) {
          outfit.coverImage = outfit.images[0] || '';
        }
      }
    }

    if (newImageUrls && newImageUrls.length > 0) {
      outfit.images.push(...newImageUrls);

      // If no cover image exists, set first new image
      if (!outfit.coverImage) {
        outfit.coverImage = newImageUrls[0];
      }
    }

    if (updateData.name !== undefined) {
      outfit.name = updateData.name;
    }

    if (updateData.description !== undefined) {
      outfit.description = updateData.description;
    }

    if (updateData.type !== undefined) {
      outfit.type = updateData.type;
    }

    if (updateData.size !== undefined) {
      outfit.size = updateData.size;
    }

    if (updateData.color !== undefined) {
      outfit.color = updateData.color;
    }

    if (updateData.gender !== undefined) {
      outfit.gender = updateData.gender;
    }

    if (updateData.price !== undefined) {
      outfit.price = updateData.price;
    }
    await outfit.save();

    return outfit;
  }

  async createJewelleryItem(user: User, body: CreateJewelleryDto, coverImage: string, images: string[]) {
    const jewelleryItem = new this.jewelleryModel({
      name: body.name.toLowerCase(),
      description: body.description.toLowerCase(),
      type: body.type.toLowerCase(),
      color: body.color.toLowerCase(),
      price: body.price,
      coverImage,
      images,
    });

    await jewelleryItem.save();
    return jewelleryItem;
  }

  async getJewelleryItemById(jewelleryId: string) {
    const jewelleryItem = await this.jewelleryModel.findById(jewelleryId);
    return jewelleryItem;
  }

  async getAllJewelleryItems() {
    const jewelleryItems = await this.jewelleryModel.find().exec();
    return jewelleryItems;
  }

  async deleteJewelleryItem(jewelleryId: string) {
    const jewelleryItem = await this.jewelleryModel.findById(jewelleryId);
    if (!jewelleryItem) {
      throw new BadRequestException('Jewellery item not found');
    }
    const allImages = [jewelleryItem.coverImage, ...jewelleryItem.images];
    for (const imageUrl of allImages) {
      const publicId = this.extractPublicId(imageUrl);
      if (publicId) {
        try {
          await cloudinary.uploader.destroy(publicId);
        } catch (error) {
          console.error('Cloudinary delete error:', error);
        }
      }
    }

    await this.jewelleryModel.deleteOne({ _id: jewelleryId });
    return { message: 'Jewellery item deleted successfully' };
  }
}
