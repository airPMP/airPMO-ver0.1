import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type myjobcardequipmentDocument = equipment & Document;

@Schema()
export class equipment {
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
  orgainization_id: string;

  @Prop({ default: Date })
  createdAt: string;

  @Prop({ default: Date })
  updatedAt: string;
}

export const myjobcardequipmentschema = SchemaFactory.createForClass(equipment);
