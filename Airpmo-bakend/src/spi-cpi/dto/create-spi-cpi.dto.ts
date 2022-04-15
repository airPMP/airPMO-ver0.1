import { ApiProperty } from '@nestjs/swagger';

export class CreateSpiCpiDto {
  
  @ApiProperty()
  activity_code: string;

  @ApiProperty()
  client_name: string;

  @ApiProperty()
  project_name: string;

  @ApiProperty()
  project_id: string;

  @ApiProperty()
  min_hour: string;

  @ApiProperty()
  productivity: [{}];
}
