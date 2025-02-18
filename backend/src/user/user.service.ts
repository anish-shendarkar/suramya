import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Outfit } from 'src/schemas/outfit.schema';
import { Jewellery } from 'src/schemas/jewellery.schema';
import { Appointment } from 'src/schemas/appointment.schema';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
        @InjectModel(Outfit.name) private readonly outfitModel: Model<Outfit>,
        @InjectModel(Jewellery.name) private readonly jewellaryModel: Model<Jewellery>,
        @InjectModel(Appointment.name) private readonly appointmentModel: Model<Appointment>
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
        const outfit = await this.outfitModel.find({ type: 'party' });
        if (!outfit) {
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

    async getAllJewelleryItems() {
        const jewelleryItems = await this.jewellaryModel.find();
        if (!jewelleryItems) {
            return new BadRequestException('Jewellery not found');
        }
        return jewelleryItems;
    }

    async bookAppointment(itemType: 'outfit' | 'jewellery', itemId: string, userId: string, body) {
        
        const user = await this.userModel.findById(userId);
        if (!user) {
            return new BadRequestException('User not found');
        }

        let outfit = null;
        let jewellery = null;

        if (itemType === 'outfit') {
            outfit = await this.outfitModel.findById(itemId);
            if (!outfit) {
                return new BadRequestException('Outfit not found');
            }
        } else if (itemType === 'jewellery') {
            jewellery = await this.jewellaryModel.findById(itemId);
            if (!jewellery) {
                return new BadRequestException('Jewellery not found');
            }
        }
        const appointment = new this.appointmentModel({
            userId: userId,
            itemType: itemType,
            status: 'placed',
        });

        if (outfit) {
            appointment.outfitId = outfit._id;
            await appointment.save();
        }
        if (jewellery) {
            appointment.jewelleryId = jewellery._id;
            await appointment.save();
        }

        await appointment.save();
        return appointment;
    }
}
