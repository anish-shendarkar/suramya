import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/schemas/user.schema'
import { Outfit } from 'src/schemas/outfit.schema';
import { Jewellery } from 'src/schemas/jewellery.schema';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Outfit.name) private readonly outfitModel: Model<Outfit>,
    @InjectModel(Jewellery.name) private readonly jewelleryModel: Model<Jewellery>,
  ) {}

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

  async createOutfit(user: User, body, coverImage: string, images: string[]) {

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

    await outfit.deleteOne();
  }

  async getAllOutfits() {
    return await this.outfitModel.find().exec();
  }

  async getOutfitById(outfitId: string) {
    return await this.outfitModel.findById(outfitId).exec();
  }

  async updateOutfit(outfitId: string, updateData: Record<string, any> ) {
    const outfit = await this.outfitModel.findByIdAndUpdate(
      outfitId,
      { $set: updateData},
      { new: true, runValidators: true}
    );
    if (!outfit) {
      throw new BadRequestException('Outfit not found');
    }
    await outfit.save();
    return {message: 'Outfit updated successfully', outfit};
  }

  async createJewelleryItem(user: User, body, coverImage: string, images: string[]) {
    const jewelleryItem = new this.jewelleryModel({
      name: body.name,
      description: body.description,
      type: body.type,
      color: body.color,
      price: body.price,
      deposit: body.deposit,
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

  async deleteJewelleryItem(user: User, jewelleryId: string) {
    const jewelleryItem = await this.jewelleryModel.findById(jewelleryId);
    if (!jewelleryItem) {
      throw new BadRequestException('Jewellery item not found');
    }

    await jewelleryItem.deleteOne();

    return {message: 'Jewellery item deleted successfully'};
  }
}
