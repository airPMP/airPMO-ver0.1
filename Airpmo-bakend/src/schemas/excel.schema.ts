import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document, SortValues } from 'mongoose';

export type excelDocument = excels & Document;
@Schema()
export class excels {
  @Prop()
  project_id: string;

  @Prop()
  is_publise_productivitysheet: boolean;
  @Prop()
  is_deleted_productivitysheet: boolean;
  @Prop()
  productivitysheet: [{}];

  @Prop()
  is_publise_quantity_sheets: boolean;
  @Prop()
  is_deleted_quantity_sheets: boolean;
  @Prop()
  quantity_sheets: [{}];

  @Prop()
  is_publise_fire_quantity_sheets: boolean;
  @Prop()
  is_deleted_fire_quantity_sheets: boolean;
  @Prop()
  fire_quantity_sheets: [{}];

  @Prop()
  is_publise_light_fitting_quantity_sheets: boolean;
  @Prop()
  is_deleted_light_fitting_quantity_sheets: boolean;
  @Prop()
  light_fitting_quantity_sheets: [];

  @Prop()
  orgainization_id: string;

  @Prop({ default: Date })
  createdAt: string;

  @Prop({ default: Date })
  updatedAt: string;
}

export const excelSchema = SchemaFactory.createForClass(excels);
