import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document } from 'mongoose';

export type jobcardDocuments = jobcard & Document;


@Schema()
export class jobcard {

    @Prop()
    project_id:string

    @Prop()
    project_name:string

    @Prop()
    activity_code: string

    @Prop()
    activity_name: string

    @Prop()
    jc_creation: string

    @Prop()
    zone: string

    @Prop()
    sub_zone: string

    @Prop()
    quantity_to_be_achieved: string

    @Prop()
    manpower_and_machinary:[]

    @Prop()
    qc_remark: string

    @Prop()
    hse_remark: string

    @Prop()
    manager_comments: string

    @Prop()
    discription: string

    @Prop({ default: Date })
    createdAt: string;

    @Prop({ default: Date })
    updatedAt: string;

}


export const jobcardSchema = SchemaFactory.createForClass(jobcard);