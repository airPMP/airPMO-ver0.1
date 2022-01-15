import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { User } from 'src/users/entities/user.entity';

export type ussersDocument = users & Document;

@Schema()
@ApiTags('users')
export class users {
  @Prop()
  FirstName: string;

  @Prop()
  LastName: string;

  @Prop()
  PhoneNumber: string;
  
  @Prop({required:true,unique:true})
   Email: string;

  @Prop()
  JobTitle: string;

  @Prop()
  CompanyName: string;

  @Prop()
  Comments: string;

 
  @Prop()
  Password: string;


  
 

  

  
 

  
  

  
 
}
export const usersSchema = SchemaFactory.createForClass(users);