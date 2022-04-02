import { ApiProperty } from '@nestjs/swagger';

export class CreateMyJobCardEquipmentDto {
  @ApiProperty()
  jc_id: string;

  @ApiProperty()
  equipment_id: string;

  @ApiProperty()
  equipment_name: string;

  @ApiProperty()
  designation: string;

  @ApiProperty()
  hour: string;

  @ApiProperty()
  remarks: string;

  @ApiProperty()
  organization_id: string;
}
