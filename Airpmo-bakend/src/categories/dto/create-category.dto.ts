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
    

        @IsNotEmpty()
        @IsString()
        @ApiProperty()
        discription:string;


        @IsNotEmpty()
        @IsString()
        @ApiProperty()
        categories_id:string;

      

        @IsNotEmpty()
        @IsString()
        @ApiProperty()
        orgainization_id: string;

        


}
