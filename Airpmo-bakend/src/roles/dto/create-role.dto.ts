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
user_id: string;
}
