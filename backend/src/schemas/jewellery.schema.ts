import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Jewellery {
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
    color: string;

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

export const JewellerySchema = SchemaFactory.createForClass(Jewellery);

