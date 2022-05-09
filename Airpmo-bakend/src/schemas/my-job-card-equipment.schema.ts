import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';

export type myjobcardequipmentDocument = equipment & Document;

@Schema()
export class equipment {
  @Prop()
  activity_id: string;

  @Prop()
  project_id: string;

  @Prop()
  max_hour: string;

  @Prop()
  jc_id: string;

  @Prop()
  equipment_id: string;

  @Prop()
  equipment_name: string;

  @Prop()
  designation: string;

  @Prop()
  hour: string;

  @Prop()
  remarks: string;

  @Prop()
  organization_id: string;

  @Prop()
  date: string;

  // @IsNotEmpty()
  @Prop()
  create_equipments: boolean;

  @Prop({ default: Date })
  createdAt: string;

  @Prop({ default: Date })
  updatedAt: string;
}

export const myjobcardequipmentschema = SchemaFactory.createForClass(equipment).plugin(softDeletePlugin);
