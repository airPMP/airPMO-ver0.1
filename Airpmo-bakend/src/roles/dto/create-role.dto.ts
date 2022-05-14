import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateRoleDto {
 
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  permission: [];

  // @IsNotEmpty()
  @ApiProperty()
  organization_id: string;

  @ApiProperty()
  project_id: string;

  @ApiProperty()
  is_assign_to_all_project: boolean;

  @ApiProperty()
  hierarchy: string;
}
