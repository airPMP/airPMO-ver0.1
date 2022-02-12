import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleDto {

@ApiProperty()    
roles_data: [];

@ApiProperty() 
name: string;

@ApiProperty() 
description: string;

@ApiProperty() 
permission: [];

@ApiProperty() 
organization_id: string;

@ApiProperty() 
  project_id: string;

@ApiProperty() 
  is_assign_to_all_project: boolean;

  @ApiProperty() 
  hierarchy: string;

}
