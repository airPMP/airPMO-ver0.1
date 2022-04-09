import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class createmyjobcardDto {
  @ApiProperty()
 project_id: string;

  @ApiProperty()
  jc_number: string;

  @ApiProperty()
  zone: string;

  @ApiProperty()
  sub_zone: string;

  @ApiProperty()
  activity_name: string;

  @ApiProperty()
  date: string;

  @ApiProperty()
  jc_executed: string;

  @ApiProperty()
  actual_employee: [];

  @ApiProperty()
  actual_equipments: [];

  @ApiProperty()
  plan_vs_allowable_vs_actual: [];

  @ApiProperty()
  quantity_to_be_achieved: string;

  @ApiProperty()
  current_quantity_to_be_achieved: string;

  @ApiProperty()
  comments: string;

  @ApiProperty()
  attach_photo: string;

  @ApiProperty()
  qc_remarks: string;

  @ApiProperty()
  hse_remark: string;

  @ApiProperty()
  manager_comments: string;

  @ApiProperty()
  discription: string;

  @ApiProperty()
  spi: string;

  @ApiProperty()
  cpi: string;


  @IsNotEmpty()
  @ApiProperty()
  organization_id: string;

}
