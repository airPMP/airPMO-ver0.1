import { ApiProperty } from '@nestjs/swagger';

export class CreateMyJobCardEmployeeDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  hour: string;

  @ApiProperty()
  remarks: string;
}
