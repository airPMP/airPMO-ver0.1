import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';

export type myjobcardDocument = myjobcard & Document;

@Schema()
export class myjobcard {
  @Prop()
  project_id: string;

  @Prop()
  jc_number: string;

  @Prop()
  zone: string;

  @Prop()
  sub_zone: string;

  @Prop()
  activity_name: string;

  @Prop()
  date: string;

  @Prop()
  jc_executed: string;

  @Prop()
  actual_employee: [{}];

  @Prop()
  actual_equipments: [{}];

  @Prop()
  plan_vs_allowable_vs_actual: [{}];

  @Prop()
  quantity_to_be_achieved: string;

  @Prop()
  current_quantity_to_be_achieved: string;

  @Prop()
  comments: string;

  @Prop()
  attach_photo: string;

  @Prop()
  qc_remarks: string;

  @Prop()
  hse_remark: string;

  @Prop()
  manager_comments: string;

  @Prop()
  discription: string;

  @Prop()
  spi: string;

  @Prop()
  cpi: string;

  @Prop()
  organization_id: string;

  @Prop({ default: Date })
  createdAt: string;

  @Prop({ default: Date })
  updatedAt: string;
}

export const myjobcardschema = SchemaFactory.createForClass(myjobcard).plugin(softDeletePlugin);
