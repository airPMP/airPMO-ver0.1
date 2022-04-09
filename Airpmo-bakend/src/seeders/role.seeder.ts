import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Seeder } from 'nestjs-seeder';
import { Role, RoleDocument } from 'src/schemas/roles.schema';
import { users, ussersDocument } from 'src/schemas/users.schema';
import { UserRole, UserRoleDocument } from 'src/schemas/user_roles.schema';

@Injectable()
export class RolesSeeder implements Seeder {
  constructor(
    @InjectModel(Role.name) private RoleModel: Model<RoleDocument>,
    @InjectModel(UserRole.name) private UserRoleModel: Model<UserRoleDocument>,
    @InjectModel(users.name) private usersModel: Model<ussersDocument>,
  ) {}

  async seed(): Promise<any> {
    let role = await this.RoleModel.insertMany([
      { name: 'Airpmo Super Admin', permission: 'ALL', organization_id: 1 },
      { name: 'super admin', permission: 'ALL', organization_id: 2 },
      { name: 'riyaz', permission: 'ALL', organization_id: 3 },
      { name: 'neeraj', permission: 'ALL', organization_id: 4 },
      { name: 'aditya', permission: 'ALL', organization_id: 5 },
      { name: 'albannaadmin', permission: 'ALL' },
      { name: 'riyazadmin', permission: 'ALL' },
    ]);
    let user = await this.usersModel.find();

    for (let i = 0; i < user.length; i++) {
      var userid = await this.UserRoleModel.insertMany({
        role_id: role[i].id,
        user_id: user[i]._id,
      });
    }
  }

  

  async drop(): Promise<any> {
    return this.RoleModel.deleteMany({});
  }
}
