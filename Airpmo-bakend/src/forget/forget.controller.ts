import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put, Headers, Header, Req, Request } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { request } from 'http';
import { Token } from 'nodemailer/lib/xoauth2';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { forgetuserdto } from 'src/users/dto/forget-user-dto';
import { loginusersDto } from 'src/users/dto/login-user.dto';
import { resetuserdto } from 'src/users/dto/reset-user-dto';
import { ForgetService } from './forget.service';
import { AuthUser } from './user.decorator';


@Controller('api')
export class ForgetController {
  constructor(private readonly forgetService: ForgetService,) {}

  @Post('forget')
 async forgetPassword(@Body() forgetuserdto:forgetuserdto,) {
   
     return await this.forgetService.forgetPassword(forgetuserdto);
    
  }
  @UseGuards(AuthGuard('jwt'))
  @Post('changepassword')
  async changePassword( @Body()  resetuserdto:resetuserdto ,@Request() req ) {
    // const a = req.headers.authorization
    // console.log(req.user)
    return await this.forgetService.changePassword(resetuserdto,req); 

   
 }

 


}