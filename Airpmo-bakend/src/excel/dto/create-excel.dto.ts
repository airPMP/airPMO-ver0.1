import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateExcelDto {

  
    @ApiProperty()
    is_publise_productivitysheet:boolean;
   
  
    @ApiProperty()
    is_publise_quantity_sheets:boolean;
    
   
    @ApiProperty()
    is_publise_fire_quantity_sheets:boolean;

   
    @ApiProperty()
    is_publise_light_fitting_quantity_sheets:boolean;
 
}
