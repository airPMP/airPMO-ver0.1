import { ApiProperty } from "@nestjs/swagger";

export class CreateSubdividedzoneDto {

     @ApiProperty()
    subdividedzone_name:string;

    @ApiProperty()
    discription:string;

    @ApiProperty()
    subzone_id:string;


    @ApiProperty()
    organization_id:string;

}
