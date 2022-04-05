import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { UserRolesService } from './user-roles.service';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import {  ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/decorator/auth.decorator';

@ApiTags('User Roles')
@Controller('api')
export class UserRolesController {
  constructor(private readonly userRolesService: UserRolesService) {}

  @Auth('CREATE-USER_ROLES')
  @Post('assign_user_roles')
  create(@Body() createUserRoleDto: CreateUserRoleDto) {
    return this.userRolesService.create(createUserRoleDto);
  }

  @Auth('GET-USER_ROLES')
  @Get('user_roles')
  findAll() {
    return this.userRolesService.findAll();
  }

  @Auth('GET-USER_ROLES')
  @Get('user_roles/:id')
  findOne(@Param('id') id: string) {
    return this.userRolesService.findOne(id);
  }

  @Auth('EDIT-USER_ROLES')
  @Patch('edit_user_roles/:id')
  update(@Param('id') id: string, @Body() updateUserRoleDto: UpdateUserRoleDto) {
    return this.userRolesService.update(id, updateUserRoleDto);
  }

  @Auth('DELETE-USER_ROLES')
  @Delete('user_roles/:id')
  remove(@Param('id') id: string) {
    return this.userRolesService.remove(id);
  }

  @Auth('GET-USER_ROLES')
  @Get('user/:user_id/roles')
  finduserroles(@Param('user_id') user_id: string) {
    return this.userRolesService.userroles(user_id);
  }

  @Auth('GET-USER_ROLES')
  @Get('role/:role_id/users')
  find_user_from_role(@Param('role_id') role_id: string) {
    return this.userRolesService.find_user_from_role(role_id);
  }
}
