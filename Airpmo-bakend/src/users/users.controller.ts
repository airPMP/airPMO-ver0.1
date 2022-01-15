import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UsePipes, ValidationPipe, ParseIntPipe ,Request, UseGuards} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { users } from 'src/schemas/users.schema';
import { loginusersDto } from './dto/login-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';




@Controller('api')

export class UsersController {
  constructor(private  readonly UsersService:UsersService){}

 @Post('register')
 @UsePipes(new ValidationPipe({ transform: true }))
    create(@Body() createUserDto: CreateUserDto) {
   return   this.UsersService.create( createUserDto);
   }


  //  @Post('local/signin')
  //  async signin(@Body()  loginusersDto:loginusersDto) {
  //   return this.UsersService.findByEmail(loginusersDto);
  // }
 
  @ApiBearerAuth("jwt-auth")
  @UseGuards(AuthGuard('jwt'))
  @Get('users')
  findAll() {
    return this.UsersService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth("jwt-auth")
  @Get('users/:id')
  findOne(@Param('id') id: string ) {
    return this.UsersService.findOne(id);
  }

  
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth("jwt-auth")
  @Put('users/:id')
  async update(@Param('id') id:string, @Body() UpdateUserDto:UpdateUserDto) {
    return this.UsersService.update(id, UpdateUserDto);
  }


 @UseGuards(AuthGuard('jwt'))
 @ApiBearerAuth("jwt-auth")
  @Delete('users/:id')
  remove(@Param('id') id: string) {
    return this.UsersService.remove(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('updateprofile')
  async updateprofile(@Body() UpdateUserDto:UpdateUserDto,@Request() req) {
   
    return this.UsersService.updateprofile(UpdateUserDto,req);
  }
}


