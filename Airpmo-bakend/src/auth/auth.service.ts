import { ConsoleLogger, Injectable, UnauthorizedException } from '@nestjs/common';
import { loginusersDto } from 'src/users/dto/login-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RolesService } from 'src/roles/roles.service';


@Injectable()
export class AuthService {

  constructor(private usersService: UsersService, private jwtService: JwtService,private roleService: RolesService){ }

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
     
       let roles= await this.roleService.userroles(user.id);

       var per=[];
       var role_name=[]; 
       for(let i=0;i<roles.length;i++)
       {

        var per=per.concat(roles[i].permission);
        role_name.push(roles[i].name);

       }
       var permission=this.arrayUnique(per);
       
        const payload = { FirstName: user.FirstName, Email: user.Email,roles:role_name,permission:permission};
        const token = this.jwtService.sign(payload)
       
        if (!token) {
          throw new UnauthorizedException
        }
        else {
        
          return {"access_token":token,"user":user,"roles":role_name,"permissions":permission};
        }
      }
    }
  }

   arrayUnique(array) {
    var a = array.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] == a[j])
                a.splice(j--, 1);
        }
    }

    return a;
}
  

}

















