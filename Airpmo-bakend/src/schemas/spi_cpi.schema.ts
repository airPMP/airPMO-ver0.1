import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document } from 'mongoose';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';

export type spicpiDocument = spicpi & Document;

@Schema()
export class spicpi {
  @Prop()
 activity_code: string;
 
  @Prop()
  client_name: string;

  @Prop()
  project_name: string;

  @Prop()
  project_id: string;

  @Prop()
  min_hour: string;

  @Prop()
  productivity: [{}];

  @Prop()
  quantity_to_be_achived: string;
  
  @Prop()
  gang_productivity: string;
  @Prop({ default: Date })
  createdAt: string;

  @Prop({ default: Date })
  updatedAt: string;
}

export const spicpiSchema =
  SchemaFactory.createForClass(spicpi).plugin(softDeletePlugin);
