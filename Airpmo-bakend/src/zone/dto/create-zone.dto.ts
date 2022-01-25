import { ApiProperty } from "@nestjs/swagger";

export class CreateZoneDto {
    @ApiProperty()
    discription: string

    @ApiProperty()
    zone_name: string

    @ApiProperty()
    project_id: string

    @ApiProperty()
    organization_id: string;
}
