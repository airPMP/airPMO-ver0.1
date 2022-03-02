import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document } from 'mongoose';

export type excelDocument = excels & Document;
@Schema()
export class excels {
   @Prop()
   project_id:string;

   @Prop()
   productivitysheet:[{}]

   @Prop()
   quantity_sheets:[{}]

   @Prop()
   fire_quantity_sheets:[{}]

   @Prop()
   light_fitting_quantity_sheets:[{}]

   @Prop({default:Date})
   createdAt: string;

   @Prop({default:Date})
   updatedAt:string;
    
}


export const excelSchema = SchemaFactory.createForClass(excels);