import { ApiProperty } from "@nestjs/swagger";

export class Update_role_Permission {

  @ApiProperty()  
    roles_permission: [{id,permission:[]}];   

}
