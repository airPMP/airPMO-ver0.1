import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';

export type subzoneDocument = subzone & Document;

@Schema()
export class subzone {
  @Prop()
  subzone_name: string;

  @Prop()
  discription: string;

  @Prop()
  zone_id: string;

  @Prop()
  organization_id: string;

  @Prop({ default: Date })
  createdAt: string;

  @Prop({ default: Date })
  updatedAt: string;
}

export const subzoneSchema = SchemaFactory.createForClass(subzone).plugin(softDeletePlugin);
