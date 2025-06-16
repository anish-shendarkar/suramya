import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Outfit } from 'src/schemas/outfit.schema';
import { Jewellery } from 'src/schemas/jewellery.schema';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
        @InjectModel(Outfit.name) private readonly outfitModel: Model<Outfit>,
        @InjectModel(Jewellery.name) private readonly jewellaryModel: Model<Jewellery>,
    ) { }

    async getOutfitById(outfitId: string) {
        return await this.outfitModel.findById(outfitId);
    }

    async getOutfitByGenderMale() {
        const outfit = await this.outfitModel.find({ gender: 'male' });
        if (!outfit) {
            return new BadRequestException('Outfit not found');
        }
        return outfit;
    }

    async getOutfitByGenderFemale() {
        const outfit = await this.outfitModel.find({ gender: 'female' });
        if (!outfit) {
            return new BadRequestException('Outfit not found');
        }
        return outfit;
    }

    async getOutfitBycategory(category: string) {
        const outfits = await this.outfitModel.find({ type: category });
        if (outfits.length === 0) {
            return new BadRequestException('Outfits not found');
        }
        return outfits;
    }

    async getJewelleryById(jewelleryId: string) {
        const jewellaryItem = await this.jewellaryModel.findById(jewelleryId);
        if (!jewellaryItem) {
            return new BadRequestException('Jewellery not found');
        }
        return jewellaryItem;
    }

    async getAllJewelleryItems() {
        const jewelleryItems = await this.jewellaryModel.find();
        if (!jewelleryItems) {
            return new BadRequestException('Jewellery not found');
        }
        return jewelleryItems;
    }

    //search functionality
    async searchOutfit(query: string) {
        const outfits = await this.outfitModel.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } },
            ]
        });
        if (outfits.length === 0) {
            return new BadRequestException('Outfits not found');
        }
        return outfits;
    }

    async searchJewellery(query: string) {
        const jewelleryItems = await this.jewellaryModel.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } },
            ]
        });
        if (jewelleryItems.length === 0) {
            return new BadRequestException('Jewellery not found');
        }
        return jewelleryItems;
    }
}
