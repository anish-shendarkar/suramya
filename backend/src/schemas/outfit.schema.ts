import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class Outfit {
    @Prop({
        required: true,
    })
    name: string;

    @Prop({
        required: true,
    })
    description: string;

    @Prop({
        required: true,
    })
    type: string;

    @Prop({
        required: true,
    })
    size: string;

    @Prop({
        required: true,
    })
    color: string;

    @Prop({
        required: true,
    })
    gender: string;

    @Prop({
        required: true,
    })
    price: number;

    @Prop({
        required: true,
    })
    deposit: number;

    @Prop({
        required: true,
    })
    coverImage: string;

    @Prop({ type: [String], required: true })
    images: string[];

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

export const OutfitSchema = SchemaFactory.createForClass(Outfit);
