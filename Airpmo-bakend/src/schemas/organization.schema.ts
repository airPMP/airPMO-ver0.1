import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document } from 'mongoose';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';

export type orgainizationDocument = orgainization & Document;

@Schema()
export class orgainization {
  @Prop()
  hrms_api_url: string;

  @Prop()
  location: string;

  @Prop()
  discription: string;

  @Prop()
  logo_url: string;

  @Prop()
  spread_sheet_id: string;

  @Prop()
  user_id: string;

  @Prop()
  address: string;

  @Prop()
  contact_details: string;

  @Prop()
  name: string;

  @Prop()
  hrms_format: string;

  @Prop()
  equipments_list: string;

  @Prop()
  hrms_salary: string;

  @Prop()
  hrms_rental: string;

  @Prop()
  hrms_url_api: string;

  @Prop()
  hrms_api_url_id: string;

  @Prop()
  hrms_api_or_sheet: boolean;

  @Prop()
  organization_image_url: string;

  @Prop({ default: Date })
  createdAt: string;

  @Prop({ default: Date })
  updatedAt: string;
}

export const orgainizationSchema =
  SchemaFactory.createForClass(orgainization).plugin(softDeletePlugin);
