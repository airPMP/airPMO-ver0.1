import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RolesService } from 'src/roles/roles.service';
import { UserRole, UserRoleDocument } from 'src/schemas/user_roles.schema';
import { UsersService } from 'src/users/users.service';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';

@Injectable()
export class UserRolesService {
  constructor(
    @InjectModel(UserRole.name) private UserRoleModel: Model<UserRoleDocument>,
    private roleService: RolesService,
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
  ) {}

  async create(createUserRoleDto: CreateUserRoleDto) {
    const create = new this.UserRoleModel(createUserRoleDto);
    return await create.save();
  }

  async findAll() {
    return await this.UserRoleModel.find();
  }

  async findOne(id: string) {
    try {
      return await this.UserRoleModel.findOne({ _id: id });
    } catch {
      throw new NotFoundException('user role not exist');
    }
  }

  async update(id: string, updateUserRoleDto: UpdateUserRoleDto) {
    try {
      await this.UserRoleModel.updateOne(
        { _id: id },
        { $set: { ...updateUserRoleDto } },
      );
      return await this.UserRoleModel.findOne({ _id: id });
    } catch {
      throw new NotFoundException('user role not exist');
    }
  }

  async remove(id: string) {
    try {
      const data = await this.UserRoleModel.deleteOne({ _id: id });
      if (!data.deletedCount) {
        return 'object not exist';
      }
      return 'deleted seccessfully';
    } catch {
      throw new NotFoundException('user role not exist');
    }
  }

  async userroles(user_id: string) {
    try {
      let user_roles = await this.UserRoleModel.find({ user_id: user_id });
      let roles = [];
      for (let i = 0; i < user_roles.length; i++) {
        let data = await this.roleService.findOne(user_roles[i].role_id);
        roles.push(data);
      }
      return roles;
    } catch {
      throw new NotFoundException('role not exist');
    }
  }

  async find_user_from_role(role_id: string) {
    try {
      let user_roles = await this.UserRoleModel.find({ role_id: role_id });

      let users = [];
      for (let i = 0; i < user_roles.length; i++) {
        let data = await this.usersService.findOne(user_roles[i].user_id);
        users.push(data);
      }
      return users;
    } catch {
      throw new NotFoundException('user not exist');
    }
  }
}
