import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';

export type LocationDocument = location & Document;

@Schema()
export class location {
    @Prop()
    location_name:string;
    
    @Prop()
    organization_id: string;

    @Prop({default:Date})
    createdAt: string;
 
    @Prop({default:Date})
    updatedAt:string;
  
}

export const locationSchema = SchemaFactory.createForClass(location).plugin(softDeletePlugin);