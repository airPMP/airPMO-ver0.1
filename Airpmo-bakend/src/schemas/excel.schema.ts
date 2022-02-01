import { DefinitionsFactory, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document } from 'mongoose';
import { Mongoose } from 'mongoose';
export type excelDocument = excels & Document;


@Schema()
export class excels {
 
 
 @Prop()
  s_no:string
  @Prop()
  first_name:string
  @Prop()
  last_name:string
  @Prop()
  country:string
  @Prop()
  age:string
  @Prop()
  id:string
}

export const excelSchema = DefinitionsFactory.createForClass(excels);