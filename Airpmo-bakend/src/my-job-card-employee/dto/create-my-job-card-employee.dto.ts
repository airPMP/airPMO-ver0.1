import { ApiProperty } from '@nestjs/swagger';

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

  @ApiProperty()
  organization_id: string;
}
