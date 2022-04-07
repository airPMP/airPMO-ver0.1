import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

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

  @IsNotEmpty()
  @ApiProperty()
  organization_id: string;
}
