import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';

export type subdividedzoneDocument = subdividedzone & Document;

@Schema()
export class subdividedzone {
    @Prop()
    subdividedzone_name:string;

    
    @Prop()
    discription:string;

    @Prop()
     subzone_id:string;
    
     @Prop()
     organization_id: string;

    @Prop({default:Date})
    createdAt: string;
 
    @Prop({default:Date})
    updatedAt:string;
  
}

export const subdividedzoneSchema = SchemaFactory.createForClass(subdividedzone).plugin(softDeletePlugin);