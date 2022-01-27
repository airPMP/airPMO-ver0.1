import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Auth } from 'src/decorator/auth.decorator';

@ApiTags('Roles')
@ApiBearerAuth()
@Controller('api')
@UseGuards(AuthGuard('jwt'))
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Auth('CREATE-ROLES')
  @Post('roles')
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Auth('GET-ROLES')
  @Get('roles')
  findAll() {
    return this.rolesService.findAll();
  }

  @Auth('GET-ROLES')
  @Get('roles/:id')
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(id);
  }

  @Auth('EDIT-ROLES')
  @Patch('roles/:id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(id, updateRoleDto);
  }

  @Auth('DELETE-ROLES')
  @Delete('roles/:id')
  remove(@Param('id') id: string) {
    return this.rolesService.remove(id);
  }

  @Auth('GET-ROLES')
  @Get('user/:user_id/roles')
  finduserroles(@Param('user_id') user_id: string) {
    return this.rolesService.userroles(user_id);
  }
}
