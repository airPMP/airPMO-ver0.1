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
    if (!user) {
      throw new UnauthorizedException("email not found")
    }
    else {
      const payload = {'Email':user.Email}
      const token = this.jwtservice.sign(payload)
      const url = `http://${process.env.HOST_NAME}/ResetPassword?token=${token}`
      // console.log('ddd',url)
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
    
    if (resetuserdto.Password !== resetuserdto.Confirm_Password) {
      throw new UnauthorizedException('password  not matcted')
    }
    else {
      const saltOrRounds = 10;
      const hash = await bcrypt.hash(resetuserdto.Password, saltOrRounds)
     // const users = await this.usersModel.findOne({ "Email": find.Email })
      await this.usersModel.updateOne(
        { Email: req.user.Email },
        { $set: { Password:hash } },
      );
      let user = await this.usersModel.findOne({ Email:req.user.Email });
    //  const updatepass = await this.usersModel.updateOne({ Password:hash })
     
      return {
        massage: "password updatetd"
      }
    }
  }

}


