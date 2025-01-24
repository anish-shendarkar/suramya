import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema'
import { Outfit } from 'src/schemas/outfit.schema';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Outfit.name) private readonly outfitModel: Model<Outfit>,
  ) {}
  

  async createOutfit(user: User, body) {

    const outfit = new this.outfitModel({
      name: body.name,
      description: body.description,
      type: body.type,
      size: body.size,
      color: body.color,
      gender: body.gender,
    });

    await outfit.save();
    return outfit;
  }

  async getAllOutfits() {
    return await this.outfitModel.find();
  }
}
