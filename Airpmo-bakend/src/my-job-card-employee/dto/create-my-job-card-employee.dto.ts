import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateMyJobCardEmployeeDto {
  
  @IsNotEmpty()
  @ApiProperty()
  activity_id: string;

  @IsNotEmpty()
  @ApiProperty()
  project_id: string;

  @IsNotEmpty()
  @ApiProperty()
  max_hour: string;

  @IsNotEmpty()
  @ApiProperty()
  jc_id: string;

  @IsNotEmpty()
  @ApiProperty()
  employee_id: string;

  @ApiProperty()
  employee_name: string;

  @ApiProperty()
  designation: string;

  @IsNotEmpty()
  @ApiProperty()
  hour: string;

  @ApiProperty()
  remarks: string;

  @IsNotEmpty()
  @ApiProperty()
  organization_id: string;

  @IsNotEmpty()
  @ApiProperty()
  date: string;

  // @IsNotEmpty()
  @ApiProperty({default:false})
  create_employee: boolean;
}
