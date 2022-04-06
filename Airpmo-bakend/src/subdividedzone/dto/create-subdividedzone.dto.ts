import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateSubdividedzoneDto {

     @ApiProperty()
    subdividedzone_name:string;

    @ApiProperty()
    discription:string;

    @ApiProperty()
    subzone_id:string;

    @IsNotEmpty()
    @ApiProperty()
    organization_id: string;

}
