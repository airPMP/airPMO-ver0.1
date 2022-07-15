import { ApiProperty } from '@nestjs/swagger';

export class CreateLocationDto {
  @ApiProperty()
  location_name: string;

  @ApiProperty()
  organization_id: string;
}
