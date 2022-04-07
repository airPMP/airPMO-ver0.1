import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoriesDocument = Categories & Document;

@Schema()
export class Categories {
   
    @Prop()
    category:string

    @Prop()
    sub_category:string
    
    @Prop()
    discription:string;

    @Prop()
    organization_id: string;

    @Prop({default:Date})
    createdAt: string;
 
    @Prop({default:Date})
    updatedAt:string;
  
}

export const CategoriesSchema = SchemaFactory.createForClass(Categories);