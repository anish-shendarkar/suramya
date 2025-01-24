import { BadRequestException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/schemas/user.schema';

const saltrounds = 9;

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
    ) {}

    async createUser(
        name: string,
        email: string,
        password: string,
        role: string,
    ) {
        const pastUser = await this.findUserByEmail(email);
        if (pastUser) {
            console.log('Past user', pastUser);
            return new BadRequestException('User already exists');
        }

        const user = new this.userModel({
            name,
            email,
            password: await bcrypt.hash(password, saltrounds),
            role,
        });
        return await user.save();
    }

    async findUserByEmail(email: string) {
        return await this.userModel.findOne({ email: email });
    }
}
