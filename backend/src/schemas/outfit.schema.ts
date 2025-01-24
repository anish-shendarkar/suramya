import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class Outfit {
    @Prop({
    })
    name: string;

    @Prop({
    })
    description: string;

    @Prop({
    })
    type: string;

    @Prop({
    })
    size: string;

    @Prop({
    })
    color: string;

    @Prop({
    })
    gender: string;

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
