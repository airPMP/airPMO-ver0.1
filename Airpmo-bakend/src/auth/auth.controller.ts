import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { loginusersDto } from 'src/users/dto/login-user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { LocalAuthGuard } from './local-auth.guard';





@Controller('api')
export class AuthController {
    constructor(private  readonly AuthService:AuthService){}
 
   
    @Post('login')
    async signin(@Body()  loginusersDto:loginusersDto) {
     return this.AuthService.validateUser(loginusersDto);
   }


}
