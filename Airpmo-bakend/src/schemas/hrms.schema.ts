import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';

export type hrmsDocuments = hrms & Document;

@Schema()
export class hrms {
  @Prop()
  hrms: [{}];

  @Prop({ default: Date })
  createdAt: string;

  @Prop({ default: Date })
  updatedAt: string;
}

export const hrmsSchema = SchemaFactory.createForClass(hrms).plugin(softDeletePlugin);
