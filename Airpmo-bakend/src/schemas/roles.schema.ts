import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


export type RoleDocument = Role & Document;

@Schema()
export class Role {
  @Prop({required: true, unique: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  permission: [];

  @Prop()
  organization_id: string;

  @Prop()
  project_id: string;

  @Prop()
  is_assign_to_all_project: boolean;

  @Prop()
  hierarchy: string;

  @Prop({ default: Date })
  createdAt: string;

  @Prop({ default: Date })
  updatedAt: string;

}
export const RoleSchema = SchemaFactory.createForClass(Role);