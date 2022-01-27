import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role, RoleDocument } from 'src/schemas/roles.schema';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role.name) private RoleModel: Model<RoleDocument>) {}
  async create(createRoleDto: CreateRoleDto) {
    if(createRoleDto.roles_data){
    for(let i=0;i<createRoleDto.roles_data.length;i++){
      createRoleDto.name=createRoleDto.roles_data[i];
    const createplan =new this.RoleModel(createRoleDto);
    await createplan.save();
    }
    return await this.RoleModel.find();
   }
    else{
      const createplan =new this.RoleModel(createRoleDto);
    return await createplan.save();
    }
  }

  async findAll() {
    return await this.RoleModel.find();
  }

  async findOne(id: string) {
    return await this.RoleModel.findOne({_id:id});
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    await this.RoleModel.updateOne({_id:id},{$set:{...updateRoleDto}});
    return await this.RoleModel.findOne({_id:id}); 
  }

  async remove(id: string) {
    const data=await this.RoleModel.deleteOne({_id:id});
    if(!data.deletedCount){
     return "object not exist";
    }
     return "deleted seccessfully";
   }
   async userroles(user_id: string) {
    return await this.RoleModel.find({user_id:user_id});
  }
  
}
