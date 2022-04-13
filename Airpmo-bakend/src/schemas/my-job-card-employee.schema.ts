import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';

export type myjobcardemployeeDocument = myjobcardemployee & Document;

@Schema()
export class myjobcardemployee {
  @Prop()
  jc_id: string;

  @Prop()
  employee_id: string;

  @Prop()
  employee_name: string;

  @Prop()
  designation: string;

  @Prop()
  hour: string;

  @Prop()
  remarks: string;

  @Prop()
  organization_id: string;

  @Prop({ default: Date })
  createdAt: string;

  @Prop({ default: Date })
  updatedAt: string;
}

export const myjobcardemployeeschema =
  SchemaFactory.createForClass(myjobcardemployee).plugin(softDeletePlugin);
