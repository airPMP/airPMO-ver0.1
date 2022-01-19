import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document } from 'mongoose';

export type orgainizationDocument = orgainization & Document;

 
@Schema()
export class orgainization {
    @Prop()
    hrms_api_url:string;

    @Prop()
    location:string;

    @Prop()
    discription:string;

    @Prop()
    logo_url:string;

    @Prop()
   spread_sheet_id:string;

   @Prop()
   user_id:string;



   @Prop()
   address:string;

   @Prop()
   contact_details:string;

   @Prop()
   name:string;


   @Prop({default:Date})
   createdAt: string;

   @Prop({default:Date})
   updatedAt:string;
    
}


export const orgainizationSchema = SchemaFactory.createForClass(orgainization);