import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Request,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/decorator/auth.decorator';
import { AuthGuard } from '@nestjs/passport';

import { stringify } from 'querystring';
@ApiTags('Users api')
@Controller('api')
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}

  @Post('users/register')
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createUserDto: CreateUserDto) {
    return this.UsersService.create(createUserDto);
  }

  @Auth('GET-USERS')
  @Get('users')
  findAll(@Req() req) {
    return this.UsersService.findAll(req);
  }

  @Auth('GET-USERS')
  @Get('users/:id')
  findOne(@Param('id') id: string) {
    return this.UsersService.findOne(id);
  }

  @Auth('EDIT-USERS')
  @Patch('users/:id')
  async update(@Param('id') id: string, @Body() UpdateUserDto: UpdateUserDto) {
    return this.UsersService.update(id, UpdateUserDto);
  }

  @Auth('DELETE-USERS')
  @Delete('users/:id')
  remove(@Param('id') id: string) {
    return this.UsersService.remove(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Patch('update/personal/profile')
  async updateprofile(@Body() UpdateUserDto: UpdateUserDto, @Request() req) {
    return this.UsersService.updateprofile(UpdateUserDto, req);
  }

  @Auth('GET-USERS')
  @Get('/organization/:oraganization_id/user')
  findorganization(@Param('oraganization_id') oraganization_id: string) {
    return this.UsersService.findorganization(oraganization_id);
  }
}
