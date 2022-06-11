import { ApiProperty } from "@nestjs/swagger";
import { IsJSON, IsNotEmpty, IsString } from "class-validator";
export class CreateClientprofileDto {

    
    @ApiProperty()
    category:string;

  
    @ApiProperty()
    client_name:string;

   
    @ApiProperty()
    location:string;

    
    @ApiProperty()
    upload_logo_file:string;

    @ApiProperty()
    add_new_feild:string;

    @ApiProperty()
    createdBy:string;
    
    
    @ApiProperty()
    discription:string;

   
    @ApiProperty()
    contact_no:string;

    @IsNotEmpty()
    @ApiProperty()
    organization_id: string;


    @ApiProperty()
    address:string;


    @ApiProperty()
    client_id:string;

    @ApiProperty()
    sub_category:string;

}
