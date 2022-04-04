import { ApiProperty } from '@nestjs/swagger';

export class assignJobCardDto {
  @ApiProperty()
  assign_data: [];

  @ApiProperty()
  orgainization_id: string;
}
