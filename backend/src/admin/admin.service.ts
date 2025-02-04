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
      hashedPassword,
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
      type: body.type,
      size: body.size,
      color: body.color,
      gender: body.gender,
      coverImage,
      images,
    });

    await outfit.save();
    return outfit;
  }

  async getAllOutfits() {
    return await this.outfitModel.find({}, 'name coverImage').exec();
  }

  async getOutfitById(outfitId: string) {
    return await this.outfitModel.findById(outfitId).exec();
  }

  async createJewelleryItem(user: User, body, coverImage: string, images: string[]) {
    const jewelleryItem = new this.jewelleryModel({
      name: body.name,
      description: body.description,
      type: body.type,
      color: body.color,
      coverImage,
      images,
    });

    await jewelleryItem.save();
    return jewelleryItem;
  }
}
