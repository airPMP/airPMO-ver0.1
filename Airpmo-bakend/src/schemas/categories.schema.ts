import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoriesDocument = Categories & Document;

@Schema()
export class Categories {
    @Prop()
    name:string;

    @Prop()
    type:string;
    
    @Prop()
    discription:string;

    @Prop()
    orgainization_id: string;

    @Prop({default:Date})
    createdAt: string;
 
    @Prop({default:Date})
    updatedAt:string;
  
}

export const CategoriesSchema = SchemaFactory.createForClass(Categories);