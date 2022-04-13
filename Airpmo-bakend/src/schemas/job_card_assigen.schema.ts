import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document } from 'mongoose';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';

export type jobcardassignDocuments = jobcardassign & Document;

@Schema()
export class jobcardassign {
  @Prop()
  assign_data: [{}];

  @Prop()
  organization_id: string;

  @Prop({ default: Date })
  createdAt: string;

  @Prop({ default: Date })
  updatedAt: string;
}

export const jobcardassignSchema = SchemaFactory.createForClass(jobcardassign).plugin(softDeletePlugin);
