import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateJobCardDto {
  @ApiProperty()
  project_id: string;

  @ApiProperty()
  project_name: string;

  @ApiProperty()
  activity_code: string;

  @ApiProperty()
  activity_name: string;

  @ApiProperty()
  jc_creation: string;

  @ApiProperty()
  zone: string;

  @ApiProperty()
  sub_zone: string;

  @ApiProperty()
  quantity_to_be_achieved: string;

  @IsNotEmpty()
  @ApiProperty()
  updated_quantity_to_be_achived: string;

  @ApiProperty()
  manpower_and_machinary: [{}];
  @ApiProperty()
  qc_remark: string;

  @ApiProperty()
  hse_remark: string;

  @ApiProperty()
  manager_comments: string;

  @ApiProperty()
  discription: string;

  @ApiProperty()
  min_hours: string;

  @IsNotEmpty()
  @ApiProperty()
  organization_id: string;

  @ApiProperty()
  assign_to: string;

  @ApiProperty()
  assign_user_id: string;

  @ApiProperty()
  job_card_no: string;

  @ApiProperty()
  permissions: string;

  @ApiProperty()
  actual_employees: [{}];

  @ApiProperty()
  actual_equipments: [{}];

  @ApiProperty()
  alanned_vs_allowable_vs_actual: [{}];

  @IsNotEmpty()
  @ApiProperty()
  hourly_salrey: string;

  // @IsNotEmpty()
  @ApiProperty()
  hourly_standrd_salrey: string;

  @ApiProperty()
  total_overall_cpi: string;

  @ApiProperty()
  total_overall_spi: string;

  @ApiProperty()
  unit: string;
}
