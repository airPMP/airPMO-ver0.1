import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document } from 'mongoose';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';

export type jobcardDocuments = jobcard & Document;

@Schema()
export class jobcard {
  @Prop()
  project_id: string;

  @Prop()
  project_name: string;

  @Prop()
  activity_code: string;

  @Prop()
  activity_name: string;

  @Prop()
  jc_creation: string;

  @Prop()
  zone: string;

  @Prop()
  sub_zone: string;

  @Prop()
  quantity_to_be_achieved: string;

  @Prop()
  updated_quantity_to_be_achived: string;

  @Prop()
  manpower_and_machinary: [];

  @Prop()
  qc_remark: string;

  @Prop()
  hse_remark: string;

  @Prop()
  manager_comments: string;

  @Prop()
  discription: string;

  @Prop()
  min_hours: string;

  @Prop()
  organization_id: string;

  @Prop()
  assign_to: string;

  @Prop()
  assign_user_id: string;

  @Prop()
  job_card_no: string;

  @Prop()
  permissions: string;

  @Prop()
  actual_employees: [{}];

  @Prop()
  actual_equipments: [{}];

  @Prop()
  alanned_vs_allowable_vs_actual: [{}];

  @Prop()
  hourly_salrey: string;

  @Prop()
  hourly_standrd_salrey: string;

  @Prop({ default: Date })
  createdAt: string;

  @Prop({ default: Date })
  updatedAt: string;
}

export const jobcardSchema =
  SchemaFactory.createForClass(jobcard).plugin(softDeletePlugin);
