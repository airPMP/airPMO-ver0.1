import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserRoleDocument = UserRole & Document;

@Schema()
export class UserRole {
  @Prop()
  user_id: string;

  @Prop()
  role_id: string;

  @Prop({ default: Date })
  createdAt: string;

  @Prop({ default: Date })
  updatedAt: string;
}
export const UserRoleSchema = SchemaFactory.createForClass(UserRole);
