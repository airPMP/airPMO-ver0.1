import { ApiProperty } from "@nestjs/swagger";

export class CreateSubzoneDto {
    @ApiProperty()
    subzone_name:string;

    @ApiProperty()
    discription:string;

    @ApiProperty()
    zone_id:string;

    @ApiProperty()
    organization_id: string;
}
