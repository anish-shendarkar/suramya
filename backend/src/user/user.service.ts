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
        const outfit = await this.outfitModel.findByIdAndUpdate(
            outfitId,
            { $inc: { views: 1 } },
            { new: true }
        );
        if (!outfit) {
            throw new BadRequestException('Outfit not found');
        }
        return outfit;
    }

    async getOutfitByGenderMale() {
        const outfit = await this.outfitModel.find({ gender: 'male' });
        if (outfit.length === 0) {
            throw new BadRequestException('Outfit not found');
        }
        return outfit;
    }

    async getOutfitByGenderFemale() {
        const outfit = await this.outfitModel.find({ gender: 'female' });
        if (outfit.length === 0) {
            throw new BadRequestException('Outfit not found');
        }
        return outfit;
    }

    async getOutfitBycategory(category: string) {
        const outfits = await this.outfitModel.find({ type: category });
        if (outfits.length === 0) {
            throw new BadRequestException('Outfits not found');
        }
        return outfits;
    }

    async getJewelleryById(jewelleryId: string) {
        const jewellaryItem = await this.jewellaryModel.findById(jewelleryId);
        if (!jewellaryItem) {
            throw new BadRequestException('Jewellery not found');
        }
        return jewellaryItem;
    }

    async getAllJewelleryItems() {
        const jewelleryItems = await this.jewellaryModel.find();
        if (jewelleryItems.length === 0) {
            throw new BadRequestException('Jewellery not found');
        }
        return jewelleryItems;
    }

    //search functionality
    async searchOutfit(query: string) {
        try {
            const outfits = await this.outfitModel.find({
                $or: [
                    { name: { $regex: query, $options: 'i' } },
                    { description: { $regex: query, $options: 'i' } },
                    { color: { $regex: query, $options: 'i' } },
                    { type: { $regex: query, $options: 'i' } },
                ]
            });
            return outfits;
        } catch (error) {
            console.error('Error during outfit search:', error);
            throw new BadRequestException('An error occurred while searching for outfits');
        }
    }

    async searchJewellery(query: string) {
        try {
            const jewelleryItems = await this.jewellaryModel.find({
                $or: [
                    { name: { $regex: query, $options: 'i' } },
                    { description: { $regex: query, $options: 'i' } },
                    { type: { $regex: query, $options: 'i' } },
                    { color: { $regex: query, $options: 'i' } },
                ]
            });
            return jewelleryItems;
        } catch (error) {
            console.error('Error during jewellery search:', error);
            throw new BadRequestException('An error occurred while searching for jewellery items');
        }
    }

    //fetching new arrivals
    async getNewArrivals() {
        const outfits = await this.outfitModel.find().sort({ createdAt: -1 }).limit(4);
        if (outfits.length === 0) {
            throw new BadRequestException('No new arrivals found');
        }
        return outfits;
    }

    async getPopularOutfits() {
        const outfits = await this.outfitModel.find().sort({ views: -1 }).limit(4);
        if (outfits.length === 0) {
            throw new BadRequestException('No popular outfits found');
        }
        return outfits;
    }
}
