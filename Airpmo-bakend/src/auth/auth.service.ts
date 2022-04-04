import { ConsoleLogger, Injectable, UnauthorizedException } from '@nestjs/common';
import { loginusersDto } from 'src/users/dto/login-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserRolesService } from 'src/user-roles/user-roles.service';


@Injectable()
export class AuthService {

  constructor(private usersService: UsersService, private jwtService: JwtService, private userroleService: UserRolesService) { }

  async validateUser(loginusersDto: loginusersDto): Promise<any> {

    const user = await this.usersService.findByEmail(loginusersDto)

    if (!user) {
      throw new UnauthorizedException("user not found")
    }
    else {

      const isMatch = await bcrypt.compare(loginusersDto.Password, user.Password);

      if (!isMatch) {
        throw new UnauthorizedException("Unauthorized")
      }
      else {
        const userdata = await this.usersService.findOne(user.id)
        let roles = await this.userroleService.userroles(user.id);

        var per = [];
        var role_name = [];
        for (let i = 0; i < roles.length; i++) {

          var per = per.concat(roles[i].permission);
          role_name.push(roles[i].name);

        }
        var permission = this.arrayUnique(per);

        const payload = { FirstName: user.FirstName, Email: user.Email, roles: role_name, permission: permission,organization_id:userdata.organization_id };
        const token = this.jwtService.sign(payload)

        if (!token) {
          throw new UnauthorizedException
        }
        else {

          return { "access_token": token, "user": userdata, "roles": role_name, "permissions": permission };
        }
      }
    }
  }

  arrayUnique(array) {
    var a = array.concat();
    for (var i = 0; i < a.length; ++i) {
      for (var j = i + 1; j < a.length; ++j) {
        if (a[i] == a[j])
          a.splice(j--, 1);
      }
    }

    return a;
  }


}

















