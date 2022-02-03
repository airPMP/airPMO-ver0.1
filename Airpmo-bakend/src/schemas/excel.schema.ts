import { DefinitionsFactory, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document } from 'mongoose';
import { Mongoose } from 'mongoose';
export type excelDocument = excels & Document;


@Schema()
export class excels {

    @Prop()
    productivitysheet: [{}]


}

export const excelSchema = DefinitionsFactory.createForClass(excels);