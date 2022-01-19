import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateOrgainizationDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    hrms_api_url:string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    location:string;

   
    @IsOptional()
    @ApiProperty()
    discription:string;


    
    @IsOptional()
    @ApiProperty()
    logo_url:string;

   
    @IsOptional()
    @ApiProperty()
    spread_sheet_id:string;

   
    @IsOptional()
    @ApiProperty()
    user_id:string;


    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    address:string;

    
    @ApiProperty()
    contact_details:string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name:string;

}
