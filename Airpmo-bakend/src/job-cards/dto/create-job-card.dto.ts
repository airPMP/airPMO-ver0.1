import { ApiProperty } from "@nestjs/swagger";

export class CreateJobCardDto {
    @ApiProperty()
    project_id:string

    @ApiProperty()
    project_name:string

    @ApiProperty()
    activity_code: string

    @ApiProperty()
    activity_name: string

    @ApiProperty()
    jc_creation: string

    @ApiProperty()
    zone: string

    @ApiProperty()
    sub_zone: string

    @ApiProperty()
    quantity_to_be_achieved: string

    @ApiProperty()
    manpower_and_machinary:[{}]
    @ApiProperty()
    qc_remark: string

    @ApiProperty()
    hse_remark: string

    @ApiProperty()
    manager_comments: string

    @ApiProperty()
    discription: string
}


