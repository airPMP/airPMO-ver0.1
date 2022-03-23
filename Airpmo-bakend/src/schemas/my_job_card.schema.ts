import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type myjobcardDocument = myjobcard & Document;

@Schema()
export class myjobcard{

@Prop()
myjobcard:[]
 }

 export const  myjobcardschema= SchemaFactory.createForClass(myjobcard);