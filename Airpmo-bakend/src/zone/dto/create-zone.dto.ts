import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateZoneDto {
    @ApiProperty()
    discription: string

    @IsNotEmpty()
    @ApiProperty()
    zone_name: string

    @IsNotEmpty()
    @ApiProperty()
    project_id: string

    @IsNotEmpty()
    @ApiProperty()
    organization_id: string;
}
