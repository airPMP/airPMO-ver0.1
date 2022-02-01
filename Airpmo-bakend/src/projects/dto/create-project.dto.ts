import { ApiProperty } from "@nestjs/swagger";
import { IsJSON, IsNotEmpty, IsString } from "class-validator";
export class CreateProjectDto {

   
    @ApiProperty()
    project_name:string;

    @ApiProperty()
    start_date:string;

    @ApiProperty()
    end_date:string;

    @ApiProperty()
    zone_name:string;

    @ApiProperty()
    zone_discription:string;

    @ApiProperty()
    subzone_name:string;

    @ApiProperty()
    subzone_discription:string;

    @ApiProperty()
    client_name:string;
    
    @ApiProperty()
    categories_id:string;

    @ApiProperty()
    client_id:string;

    @ApiProperty()
    orgainization_id: string;

    @ApiProperty()
    discription: string;

    @ApiProperty()
    min_hours:string;

    @ApiProperty()
    max_hours:string;

    @ApiProperty()
    location:string;

    @ApiProperty()
    consultant_name:string;

    @ApiProperty()
    project_value: string;

    @ApiProperty()
    category:string;

    @ApiProperty()
    sub_category:string;

    @ApiProperty()
    spread_sheet_key: string;

    @ApiProperty()
    project_id:string;

    @ApiProperty()
    time_sheet_id: string;

    @ApiProperty()
    spread_sheet_id: string;

}
