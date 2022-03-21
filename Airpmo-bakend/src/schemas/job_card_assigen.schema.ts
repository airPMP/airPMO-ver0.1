import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document } from 'mongoose';

export type jobcardassignDocuments = jobcardassign & Document;


@Schema()
export class jobcardassign {

    @Prop()
    project_id:string

    @Prop()
    job_card_no:string


    @Prop()
    activity_code: string


    @Prop()
    zone: string


    @Prop()
    quantity_to_be_achieved: string

    @Prop()
    discription: string

    @Prop()
    assign_to:string

    @Prop({ default: Date })
    createdAt: string;

    @Prop({ default: Date })
    updatedAt: string;

}


export const jobcardassignSchema = SchemaFactory.createForClass(jobcardassign);