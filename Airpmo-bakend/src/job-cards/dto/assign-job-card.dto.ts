import { ApiProperty } from "@nestjs/swagger";

export class assignJobCardDto {
@ApiProperty()
project_id:string

@ApiProperty()
project_name:string

@ApiProperty()
job_card_no:string

@ApiProperty()
activity_code: string

@ApiProperty()
zone: string

@ApiProperty()
quantity_to_be_achieved: string

@ApiProperty()
discription: string

@ApiProperty()
assign_to:string

}