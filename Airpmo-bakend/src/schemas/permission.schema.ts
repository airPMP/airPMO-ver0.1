import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


export type PermissionDocument = Permission & Document;

@Schema()
export class Permission {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop({ default: Date })
  createdAt: string;

  @Prop({ default: Date })
  updatedAt: string;

}
export const PermissionSchema = SchemaFactory.createForClass(Permission);