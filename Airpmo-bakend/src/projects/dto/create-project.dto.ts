import { ApiProperty } from "@nestjs/swagger";
import { IsJSON, IsNotEmpty, IsString } from "class-validator";
export class CreateProjectDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    project_name:string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    start_date:string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    end_date:string;

    
    @ApiProperty()
    zone_name:string;

   
    @ApiProperty()
    zone_discription:string;

  
    @ApiProperty()
    subzone_name:string;

   
    @ApiProperty()
    subzone_discription:string;


  
    @ApiProperty()
    client_name:string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    categories_id:string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    client_id:string;


    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    orgainization_id: string;

  
    @ApiProperty()
    discription: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    min_hours:string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    max_hours:string;

   
    @ApiProperty()
    location:string;

   
    @ApiProperty()
    consultant_name:string;


    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    project_value: string;


}
