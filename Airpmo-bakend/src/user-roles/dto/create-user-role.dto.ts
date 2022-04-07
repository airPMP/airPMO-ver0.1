import { ApiProperty } from "@nestjs/swagger";

export class CreateUserRoleDto {

    @ApiProperty() 
    user_id: string;
    
    @ApiProperty() 
    role_id: string;


}
