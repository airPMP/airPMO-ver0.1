import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiTags } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type projectDocument = project & Document;

@Schema()
export class project {
  @Prop()
  project_name: string;

  @Prop()
  start_date: string;

  @Prop()
  end_date: string;

  @Prop()
  discription: string;

  @Prop()
  zone_name: string;

  @Prop()
  zone_discription: string;

  @Prop()
  subzone_name: string;

  @Prop()
  subzone_discription: string;

  @Prop()
  client_name: string;

  @Prop()
  categories_id: string;

  @Prop()
  client_id: string;

  @Prop()
  organization_id: string;

  @Prop()
  min_hours: string;

  @Prop()
  max_hours: string;

  @Prop()
  location: string;

  @Prop()
  consultant_name: string;

  @Prop()
  project_value: string;

  @Prop()
  category: string;

  @Prop()
  sub_category: string;

  @Prop()
  spread_sheet_key: string;

  @Prop({ default: Date })
  createdAt: string;

  @Prop({ default: Date })
  updatedAt: string;

  @Prop()
  project_id: string;

  @Prop()
  time_sheet_id: string;

  @Prop()
  spread_sheet_id: string;
}

export const projectSchema = SchemaFactory.createForClass(project);
