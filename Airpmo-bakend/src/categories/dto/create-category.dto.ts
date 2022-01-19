import { ApiProperty } from "@nestjs/swagger";
import { IsJSON, IsNotEmpty, IsString } from "class-validator";
export class CreateCategoryDto {

        @IsString()
        @IsNotEmpty()
        @ApiProperty()
        name:string;
    
        @IsString()
        @IsNotEmpty()
        @ApiProperty()
        type:string;
    
        @IsString()
        @IsNotEmpty()
        @ApiProperty()
        discription:string;

        @IsString()
        @IsNotEmpty()
        @ApiProperty()
        categories_id:string;

        @IsString()
        @IsNotEmpty()
        @ApiProperty()
        orgainization_id: string;

        


}
