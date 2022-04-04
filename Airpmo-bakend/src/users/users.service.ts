import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { users, ussersDocument } from 'src/schemas/users.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { loginusersDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { UserRolesService } from 'src/user-roles/user-roles.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(users.name) private usersModel: Model<ussersDocument>,
    @Inject(forwardRef(() => UserRolesService))
    private userRolesService: UserRolesService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    if (createUserDto.Password) {
      const saltOrRounds = 10;
      const hash = await bcrypt.hash(createUserDto.Password, saltOrRounds);
      createUserDto.Password = hash;
    }
    const user = await this.usersModel.findOne({ Email: createUserDto.Email });
    if (!user) {
      let userdata = await this.usersModel.create(createUserDto);
      return await this.findOne(userdata.id);
    } else {
      throw new UnauthorizedException('User already rigister');
    }
  }

  async findByEmail(loginusersDto: loginusersDto) {
    const user = await this.usersModel
      .findOne({ Email: loginusersDto.Email })
      .select('Password')
      .select('Email');
    return user;
  }

  async findAll() {
    try {
      var new_obj = {};
      var new_arr = [];
      const users = await this.usersModel.find().lean();

      for (let i = 0; i < users.length; i++) {
        const user_designation = await this.userRolesService.userroles(
          users[i]._id.toString(),
        );

        if (user_designation.length != 0 && user_designation[0] != null) {
          const desig = user_designation[0].name;
          const ab = { designation: desig };
          const obj = Object.assign({}, users[i], ab);
          new_arr.push(obj);
        } else {
          new_arr.push(users[i]);
        }
      }
      return new_arr;
    } catch {
      throw new UnprocessableEntityException('user not found');
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      await this.usersModel.updateOne(
        { _id: id },
        { $set: { ...updateUserDto } },
      );
      let user = await this.usersModel.findOne({ id });
      return user;
    } catch {
      throw new NotFoundException('user not exist');
    }
  }

  async remove(id: string) {
    try {
      const user = await this.usersModel.deleteOne({ _id: id });
      return {
        massage: 'user deleted',
      };
    } catch {
      throw new NotFoundException('user not exist');
    }
  }

  async findOne(id: string) {
    try {
      const findroles = await this.userRolesService.userroles(id);
      const user = await this.usersModel.findOne({ _id: id });
      return user;
    } catch {
      throw new NotFoundException('user not exist');
    }
  }

  async updateprofile(updateUserDto: UpdateUserDto, req) {
    const EmailPayload = req.user;
    const user = await this.usersModel.findOne({ Email: EmailPayload.Email });
    if (!user) {
      throw new UnauthorizedException('wrong user');
    } else {
      if (updateUserDto.Password) {
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(updateUserDto.Password, saltOrRounds);
        updateUserDto.Password = hash;
      }
      await this.usersModel.updateOne(
        { Email: user.Email },
        { $set: { ...updateUserDto } },
      );
      let users = await this.usersModel.findOne({ Email: user.Email });
      return users;
    }
  }

  async findorganization(oraganization_id: string) {
    const organization = await this.usersModel.find({
      organization_id: oraganization_id,
    });
    return organization;
  }
}
