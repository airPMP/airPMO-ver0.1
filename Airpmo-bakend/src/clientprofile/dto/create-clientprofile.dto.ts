import { ApiProperty } from "@nestjs/swagger";
import { IsJSON, IsNotEmpty, IsString } from "class-validator";
export class CreateClientprofileDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    category:string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    client_name:string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    location:string;

    @IsString()
    @IsNotEmpty()
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

    
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    client_id:string;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    orgainization_id: string;

}
