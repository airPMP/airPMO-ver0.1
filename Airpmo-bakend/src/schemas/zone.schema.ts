import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';

export type zoneDocument = zone & Document;

@Schema()
export class zone {
    @Prop()
    zone_name:string;

    @Prop()
    discription:string;

    @Prop()
    project_id:string;
    
    @Prop()
    organization_id: string;

    @Prop({default:Date})
    createdAt: string;
 
    @Prop({default:Date})
    updatedAt:string;
  
}

export const zoneSchema = SchemaFactory.createForClass(zone).plugin(softDeletePlugin);