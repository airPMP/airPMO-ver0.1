import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateMyJobCardEmployeeDto {
  @ApiProperty()
  jc_id: string;

  @ApiProperty()
  employee_id: string;

  @ApiProperty()
  employee_name: string;

  @ApiProperty()
  designation: string;

  @ApiProperty()
  hour: string;

  @ApiProperty()
  remarks: string;

  @IsNotEmpty()
  @ApiProperty()
  organization_id: string;
}
