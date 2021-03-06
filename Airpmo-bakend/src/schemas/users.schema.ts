import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';
export type ussersDocument = users & Document;

@Schema()
export class users {
  @Prop()
  username: string;

  @Prop()
  FirstName: string;

  @Prop()
  LastName: string;

  @Prop()
  PhoneNumber: string;

  @Prop({ required: true , unique: false})
  Email: string;

  @Prop()
  JobTitle: string;

  @Prop()
  CompanyName: string;

  @Prop()
  Comments: string;

  @Prop({ select: false })
  Password: string;

  @Prop()
  organization_id: string;

  @Prop()
  district: string;

  @Prop()
  address: string;

  @Prop()
  blood_group: string;

  @Prop()
  place: string;

  @Prop()
  emergency_contact: string;

  @Prop()
  image: string;

  @Prop()
  spread_sheet_user_id: string;

  @Prop({ default: false })
  is_employee: boolean;

  @Prop()
  job_title: string;

  @Prop()
  location: string;

  @Prop({ default: Date })
  createdAt: string;

  @Prop({ default: Date })
  updatedAt: string;

  @Prop({ default: Date })
  deletedAt: string;
}
export const usersSchema =
  SchemaFactory.createForClass(users).plugin(softDeletePlugin);
