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
        return await this.outfitModel.findById(outfitId).exec();
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

    async getOutfitByTypeBridal() {
        const outfit = await this.outfitModel.find({ type: 'bridal' });
        if (!outfit) {
            return new BadRequestException('Outfit not found');
        }
        return outfit;
    }

    async getOutfitByTypeTraditional() {
        const outfit = await this.outfitModel.find({ type: 'traditional' });
        if (!outfit) {
            return new BadRequestException('Outfit not found');
        }
        return outfit;
    }

    async getOutfitByTypeParty() {
        const outfit = await this.outfitModel.find({type: 'party'});
        if(!outfit) {
            return new BadRequestException('outfit not found');
        }
        return outfit;
    }

    async getJewelleryById(jewelleryId: string) {
        const jewellaryItem = await this.jewellaryModel.findById(jewelleryId);
        if (!jewellaryItem) {
            return new BadRequestException('Jewellery not found');
        }
        return jewellaryItem;
    }
}
