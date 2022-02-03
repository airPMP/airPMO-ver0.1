import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Seeder} from "nestjs-seeder";
import { Role, RoleDocument } from "src/schemas/roles.schema";
import { users, ussersDocument } from "src/schemas/users.schema";
import { UserRole, UserRoleDocument } from "src/schemas/user_roles.schema";
 
@Injectable()
export class RolesSeeder implements Seeder {
  constructor(@InjectModel(Role.name) private RoleModel: Model<RoleDocument>,@InjectModel(UserRole.name) private UserRoleModel: Model<UserRoleDocument>,@InjectModel(users.name) private usersModel: Model<ussersDocument>) {}
 
  async seed(): Promise<any> {

    let role= await this.RoleModel.insertMany([{name:"Airpmo Super Admin",permission:'ALL'},{name:"super admin",permission:'ALL'}]);
    let user= await this.usersModel.find();
    return await this.UserRoleModel.insertMany({role_id:role[0].id,user_id:user[user.length-1].id});

  }
 
  async drop(): Promise<any> {
    return this.RoleModel.deleteMany({});
  }
}