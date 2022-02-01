import { DefinitionsFactory, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document } from 'mongoose';
import { Mongoose } from 'mongoose';
export type excelDocument = excels & Document;


@Schema()
export class excels {
 
 
   @Prop()
   array:[{Object}] 
}

export const excelSchema = DefinitionsFactory.createForClass(excels);