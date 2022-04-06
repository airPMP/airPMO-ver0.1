import { ApiProperty } from "@nestjs/swagger";
import { IsJSON, IsNotEmpty, IsString } from "class-validator";
export class CreateCategoryDto {

      
        @ApiProperty()
        category:string
    
       
        @ApiProperty()
        sub_category:string
    

        @ApiProperty()
        discription:string;

        @IsNotEmpty()
        @ApiProperty()
        organization_id: string;

        


}
