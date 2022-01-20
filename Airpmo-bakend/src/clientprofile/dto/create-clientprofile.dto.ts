import { ApiProperty } from "@nestjs/swagger";
import { IsJSON, IsNotEmpty, IsString } from "class-validator";
export class CreateClientprofileDto {

    
    @ApiProperty()
    category:string;

  
    @ApiProperty()
    client_name:string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    location:string;

    
    @ApiProperty()
    upload_logo_file:string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    add_new_feild:string;

  
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    discription:string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    contact_no:string;

    
   
    @ApiProperty()
    client_id:string;
    
  
    @ApiProperty()
    orgainization_id: string;

}
