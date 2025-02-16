import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class User {
    @Prop({
        required: true,
    })
    name: string;

    @Prop({
        unique: true,
        required: true,
    })
    email: string;

    @Prop({
        required: true,
    })
    password: string;

    @Prop({
        required: true,
    })
    role: string;

    @Prop({
        default: Date.now,
        type: Date,
    })
    createdAt: Date;

    @Prop({
        default: Date.now,
        type: Date,
    })
    updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
