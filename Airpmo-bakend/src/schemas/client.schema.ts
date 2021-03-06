import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document } from 'mongoose';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';

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
    organization_id: string;

    @Prop()
    contact_no:string;

    @Prop()
   address:string;

    @Prop()
    client_id:string;

    @Prop()
    sub_category:string;

    @Prop()
    createdBy:string;
    
   @Prop({default:Date})
   createdAt: string;

   @Prop({default:Date})
   updatedAt:string;
    
}


export const ClientSchema = SchemaFactory.createForClass(Client).plugin(softDeletePlugin);