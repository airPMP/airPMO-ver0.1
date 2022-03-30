import { ApiProperty } from '@nestjs/swagger';

export class CreateMyJobCardEmployeeDto {
  @ApiProperty()
  jc_id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  hour: string;

  @ApiProperty()
  remarks: string;
}
