import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateSubzoneDto {
    @ApiProperty()
    subzone_name:string;

    @ApiProperty()
    discription:string;

    @ApiProperty()
    zone_id:string;

    @IsNotEmpty()
    @ApiProperty()
    organization_id: string;
}
