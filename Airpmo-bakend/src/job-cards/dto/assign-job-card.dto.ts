import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class assignJobCardDto {
  @ApiProperty()
  assign_data: [];

  @IsNotEmpty()
  @ApiProperty()
  organization_id: string;
}
