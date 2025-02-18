import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';
import { User } from './user.schema';

@Schema()
export class Appointment {
    @Prop({
        type: Types.ObjectId,
        ref: 'User'
    })
    userId: Types.ObjectId; 

    @Prop({ enum: ['outfit', 'jewellery'], required: true })
    itemType: 'outfit' | 'jewellery';

    @Prop({
        type: Types.ObjectId, ref: 'Outfit'
    })
    outfitId: Types.ObjectId;

    @Prop({
        type: Types.ObjectId, ref: 'Jewellery'
    })
    jewelleryId: Types.ObjectId;

    @Prop({ default: 'pending' })
    status: string;

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ default: Date.now })
    updatedAt: Date;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
