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
  updated_quantity_to_be_achieved: string;


  @Prop()
  cumilative_quantity_to_be_achived:string;

  @Prop()
  cumilative_quantity_log:[]

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
  actual_employees_rollup: [];

  @Prop()
  actual_equipments_rollup: [];

  @Prop()
  actual_equipments: [{}];

  @Prop()
  planned_vs_allowable_vs_actual: [{}];

  @Prop()
  planned_vs_allowable_vs_actual_rollup: [{}];

  @Prop()
  hourly_salary: string;

  @Prop()
  hourly_standard_salary: string;

  @Prop()
  total_overall_cpi: string;

  @Prop()
  total_overall_spi: string;

  @Prop()
  unit: string;

  @Prop()
  isMainActitvity: boolean;

  @Prop()
  mainActitvityCode: string;

  @Prop()
  subActitvity: [];

  @Prop({ default: Date })
  createdAt: string;

  @Prop({ default: Date })
  updatedAt: string;
}

export const jobcardSchema =
  SchemaFactory.createForClass(jobcard).plugin(softDeletePlugin);
