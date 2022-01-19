import { HttpException, HttpStatus, Injectable, NotFoundException, Request, UnauthorizedException } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { users, ussersDocument } from 'src/schemas/users.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { loginusersDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersController } from './users.controller';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(users.name) private usersModel: Model<ussersDocument>,

  ) { }

  async create(createUserDto: CreateUserDto) {
    if(createUserDto.Password){
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(createUserDto.Password, saltOrRounds);
    createUserDto.Password = hash;
    }
    const user = await this.usersModel.findOne({ "Email": createUserDto.Email })
   
    if(!user)
    {
     return await this.usersModel.create(createUserDto)
    }
    else{
      throw new UnauthorizedException("User already rigister")
    }
   
  
  }

  async findByEmail(loginusersDto: loginusersDto) {
    const user = await this.usersModel.findOne({ "Email": loginusersDto.Email })
    return user
  }


  findAll() {
    return this.usersModel.find();
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.usersModel.updateMany({ "_id":id },{ ...updateUserDto } )
  }

  remove(id: string) {
    return this.usersModel.deleteOne({ "_id":id })
  }


  findOne(id: string) {
    try {
     const user = this.usersModel.findOne({ _id: id })
     return user
    } catch {
      throw new NotFoundException()
    }
   

  }


  async updateprofile(updateUserDto: UpdateUserDto, req) {
    const EmailPayload = req.user
    console.log(EmailPayload.Email)
    const user = await this.usersModel.findOne({ "Email": EmailPayload.Email })
    console.log(user)
    if (!user) {
      throw new UnauthorizedException("wrong user")
    }


    else  {
      if(updateUserDto.Password)
      {
      const saltOrRounds = 10;
      const hash = await bcrypt.hash(updateUserDto.Password, saltOrRounds);
      updateUserDto.Password = hash
      }
      const updatedata = await this.usersModel.updateMany({ "Email": user.Email }, { "Email":updateUserDto.Email,"FirstName":updateUserDto.FirstName,"LastName":updateUserDto.LastName,"PhoneNumber":updateUserDto.PhoneNumber,"CompanyName":updateUserDto.CompanyName,"Comments":updateUserDto.Comments,"Password":updateUserDto.Password,})
      return user
    }
    


  }


}
