import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { length } from 'class-validator';
import { Model } from 'mongoose';
import { from } from 'rxjs';
import { users, ussersDocument } from 'src/schemas/users.schema';
import { forgetuserdto } from 'src/users/dto/forget-user-dto';
import { loginusersDto } from 'src/users/dto/login-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';
import { resetuserdto } from 'src/users/dto/reset-user-dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from 'src/auth/auth.service';
import { userInfo } from 'os';

@Injectable()
export class ForgetService {
  constructor(@InjectModel(users.name) private usersModel: Model<ussersDocument>,

    private mailerService: MailerService, private readonly jwtservice:JwtService,

  ) { }

  async forgetPassword(forgetuserdto: forgetuserdto) {
    const user = await this.usersModel.findOne({ 'Email': forgetuserdto.Email })
    console.log(user)

    if (!user) {
      throw new UnauthorizedException("email not found")
    }
    else {
      const payload = {'Email':user.Email}
      const token = this.jwtservice.sign(payload)
      const url = `http://${process.env.HOST_NAME}/ResetPassword?token=${token}`
      await this.mailerService.sendMail
        ({
          to: user.Email,
          subject: 'reset your pass',
          html: `click<a href="${url}"> HERE </a> to reset your Password`
        })
      return {
        massage: 'Mail All Ready Send plz check mail'
      }
    }
  }


  async changePassword(resetuserdto: resetuserdto,req) {
    console.log(req.user)
    if (resetuserdto.Password !== resetuserdto.Confirm_Password) {
      throw new UnauthorizedException('password  not matcted')
    }
    

    else {
      const pass = await resetuserdto.Confirm_Password
      const saltOrRounds = 10;
      const hash = await bcrypt.hash(pass, saltOrRounds)
      const find = req.user
      const users = await this.usersModel.findOne({ "Email": find.Email })
      console.log(users)
     const updatepass = await this.usersModel.updateOne({Password:users.Password },{ Password:hash })
     
      return {
        massage: "password updatetd"
      }
    }
  }

}


