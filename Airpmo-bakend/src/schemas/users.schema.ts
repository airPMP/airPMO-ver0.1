import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { User } from 'src/users/entities/user.entity';

export type ussersDocument = users & Document;

@Schema()
export class users {
  @Prop()
  FirstName: string;

  @Prop()
  LastName: string;

  @Prop()
  PhoneNumber: string;

  @Prop({ required: true, unique: true })
  Email: string;

  @Prop()
  JobTitle: string;

  @Prop()
  CompanyName: string;

  @Prop()
  Comments: string;


  @Prop()
  Password: string;


  @Prop()
  organization_id: string;

  @Prop()
  mob_no: string;

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


  @Prop()
  designation: string;


  @Prop({ default: Date })
  createdAt: string;

  @Prop({ default: Date })
  updatedAt: string;

}
export const usersSchema = SchemaFactory.createForClass(users);