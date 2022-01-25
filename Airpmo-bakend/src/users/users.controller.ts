import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UsePipes, ValidationPipe, ParseIntPipe ,Request, UseGuards, HttpException, HttpStatus, UseFilters} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { users } from 'src/schemas/users.schema';
import { loginusersDto } from './dto/login-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';




@ApiTags('Users api')
@Controller('api')

export class UsersController {
  constructor(private  readonly UsersService:UsersService){}

 @Post('users/register')
 @UsePipes(new ValidationPipe({ transform: true }))
    create(@Body() createUserDto: CreateUserDto) {
   return this.UsersService.create( createUserDto);
   }


  @ApiBearerAuth()
  @Get('users')
  @UseGuards(AuthGuard('jwt'))
   findAll() {
    return this.UsersService.findAll();
  }
  
  
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('users/:id')
  findOne(@Param('id') id: string ) {
    return this.UsersService.findOne(id);
   
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put('users/:id')
  async update(@Param('id') id:string, @Body() UpdateUserDto:UpdateUserDto) {
    return this.UsersService.update(id, UpdateUserDto);
  }

  @ApiBearerAuth()
 @UseGuards(AuthGuard('jwt'))
  @Delete('users/:id')
  remove(@Param('id') id: string) {
    return this.UsersService.remove(id);
  }
  
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Patch('profile')
  async updateprofile(@Body() UpdateUserDto:UpdateUserDto,@Request() req) {
    return this.UsersService.updateprofile(UpdateUserDto,req);
  }




  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('/organization/:oraganization_id/find_organization')
  findorganization(@Param('oraganization_id') oraganization_id: string ) {
    return this.UsersService.findorganization(oraganization_id);
   
  }


}


