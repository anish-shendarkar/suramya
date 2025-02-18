import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/schemas/user.schema'
import { Outfit } from 'src/schemas/outfit.schema';
import { Jewellery } from 'src/schemas/jewellery.schema';
import { Appointment } from 'src/schemas/appointment.schema';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Outfit.name) private readonly outfitModel: Model<Outfit>,
    @InjectModel(Jewellery.name) private readonly jewelleryModel: Model<Jewellery>,
    @InjectModel(Appointment.name) private readonly appointmentModel: Model<Appointment>,
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

  async deleteOutfit(user: User, outfitId: string) {
    const outfit = await this.outfitModel.findById(outfitId);
    if (!outfit) {
      throw new BadRequestException('Outfit not found');
    }

    await outfit.deleteOne();
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

  async getJewelleryItemById(jewelleryId: string) {
    const jewelleryItem = await this.jewelleryModel.findById(jewelleryId);
    return jewelleryItem;
  }

  async getAllJewelleryItems() {
    const jewelleryItems = await this.jewelleryModel.find({}, 'name coverImage').exec();
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

  async getAppointmentById(appointmentId: string) {
    const appointment = await this.appointmentModel.findById(appointmentId);
    if(!appointment) {
      throw new BadRequestException('Appointment not found');
    }

    return appointment;
  }

  async getAllAppointments() {
    const appointments = await this.appointmentModel.find().populate('outfitId'); //populate UserId
    if(!appointments) {
      throw new BadRequestException('Appointments not found');
    }

    return appointments;
  }
}
