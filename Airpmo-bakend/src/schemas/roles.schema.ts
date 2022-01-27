import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


export type RoleDocument = Role & Document;

@Schema()
export class Role {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  permission: [];

  @Prop()
  user_id: string;

  @Prop({ default: Date })
  createdAt: string;

  @Prop({ default: Date })
  updatedAt: string;

}
export const RoleSchema = SchemaFactory.createForClass(Role);