import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/decorator/auth.decorator';


@ApiTags('Permission')
@Controller('api')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Auth('CREATE-PERMISSIONS')
  @Post('permission')
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionService.create(createPermissionDto);
  }

  @Auth('GET-PERMISSIONS')
  @Get('permission')
  findAll() {
    return this.permissionService.findAll();
  }

  @Auth('GET-PERMISSIONS')
  @Get('permission/:id')
  findOne(@Param('id') id: string) {
    return this.permissionService.findOne(id);
  }

  @Auth('EDIT-PERMISSIONS')
  @Patch('permission/:id')
  update(@Param('id') id: string, @Body() updatePermissionDto: UpdatePermissionDto) {
    return this.permissionService.update(id, updatePermissionDto);
  }

  @Auth('DELETE-PERMISSIONS')
  @Delete('permission/:id')
  remove(@Param('id') id: string) {
    return this.permissionService.remove(id);
  }

}
