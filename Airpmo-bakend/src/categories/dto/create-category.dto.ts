import { ApiProperty } from "@nestjs/swagger";
import { IsJSON, IsNotEmpty, IsString } from "class-validator";
export class CreateCategoryDto {

        @IsNotEmpty()
        @IsString()
        @ApiProperty()
        name:string;
    
        @IsNotEmpty()
        @IsString()
        @ApiProperty()
        type:string;
    

        @ApiProperty()
        discription:string;

      
        @ApiProperty()
        orgainization_id: string;

        


}
