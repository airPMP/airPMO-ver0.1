import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { loginusersDto } from 'src/users/dto/login-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { createSecretKey, sign, verify } from 'crypto';
import { throwError } from 'rxjs';
import { Console } from 'console';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {


  constructor(private usersService: UsersService, private jwtService: JwtService){ }

  async validateUser(loginusersDto: loginusersDto): Promise<any> {

    const user = await this.usersService.findByEmail(loginusersDto)

    if (!user) {
      throw new UnauthorizedException("user not found")
    }
    else {

      const isMactchh = await bcrypt.compare(loginusersDto.Password, user.Password);

      if (!isMactchh) {
        throw new UnauthorizedException("Unauthorized")
      }
      else {
        const payload = { FirstName: user.FirstName, Email: user.Email};
      
        const token = this.jwtService.sign(payload)
       
          
        
        if (!token) {
          throw new UnauthorizedException
        }
        else {
        
          return {token,user};
        }
      }
    }
  }
  

}




    // console.log(user.Email)
    // console.log(loginusersDto.Password)
    // const saltOrRounds = 10;
    // const hash = await bcrypt.hash(user.Password,saltOrRounds);
    // console.log(hash)
    // const isMactchh =   await bcrypt.compare(user.Password,hash);
    //  console.log(isMactchh)
















