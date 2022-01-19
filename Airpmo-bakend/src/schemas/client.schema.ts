import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document } from 'mongoose';

export type ClientDocument = Client & Document;

 
@Schema()
export class Client {
    @Prop()
    category:string;

    @Prop()
    client_name:string;

    @Prop()
    location:string;

    @Prop()
    upload_logo_file:string;

    @Prop()
    add_new_feild:string;
    
    @Prop()
    discription:string;

    @Prop()
    client_id:string;

    @Prop()
    orgainization_id: string;

    @Prop()
   contact_no:string;

   @Prop({default:Date})
   createdAt: string;

   @Prop({default:Date})
   updatedAt:string;
    
}


export const ClientSchema = SchemaFactory.createForClass(Client);