import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateMyJobCardEquipmentDto {
  @ApiProperty()
  activity_id: string;

  @IsNotEmpty()
  @ApiProperty()
  project_id: string;

  @IsNotEmpty()
  @ApiProperty()
  max_hour: string;

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

  @IsNotEmpty()
  @ApiProperty()
  date: string;

 



  @ApiProperty({default:false})
  create_equipments: boolean;
}
