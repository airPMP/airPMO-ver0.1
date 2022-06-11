import { BasicStrategy } from 'passport-http';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable,UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LocalStrategy extends PassportStrategy(BasicStrategy, 'local') {
  constructor(private usersService: UsersService) {
    super()
  }

  async validate(username?: string, password?: string): Promise<any> {
    const user = await this.usersService.findBasicAuth(username)
    if (!user) {
        throw new UnauthorizedException("user not found")
    }else{
        const isMatch = await bcrypt.compare(password, user.Password);

        if (!isMatch) {
          throw new UnauthorizedException("Unauthorized")
        }else{
            return true;
        }
    }
  }
}