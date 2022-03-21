import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role, RoleDocument } from 'src/schemas/roles.schema';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Update_role_Permission } from './dto/update_permission-role.dto';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role.name) private RoleModel: Model<RoleDocument>) {}
  async create(createRoleDto: CreateRoleDto) {
    try{
    if(createRoleDto.roles_data){
    for(let i=0;i<createRoleDto.roles_data.length;i++){
      createRoleDto.name=createRoleDto.roles_data[i];
    const create =new this.RoleModel(createRoleDto);
    await create.save();
    }
    return await this.RoleModel.find();
   }
    else{
      const create =new this.RoleModel(createRoleDto);
        return await create.save();
    }
  }catch{
    throw new NotFoundException("roles all ready exist")
  }
}

  async findAll() {
    return await this.RoleModel.find();
  }

  async findOne(id: string) {
    try
    {
    return await this.RoleModel.findOne({_id:id});
    }
    catch 
    {
      throw new NotFoundException("role not exist")
    }
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    try{
      await this.RoleModel.updateOne({_id:id},{$set:{...updateRoleDto}});
      return await this.RoleModel.findOne({_id:id}); 
      }
    catch
      {
     throw new NotFoundException("role not exist")
      }
  }

  async remove(id: string) {
    try{
        const data=await this.RoleModel.deleteOne({_id:id});
        if(!data.deletedCount){
         return "object not exist";
        }
        return "deleted seccessfully";
       }
    catch 
      {
        throw new NotFoundException("role not exist")
      }
   }


   async projectroles(project_id: string) {
     try
     {
      return await this.RoleModel.find({project_id:project_id});
     }
     catch 
     {
      throw new NotFoundException("project role not exist")
     }
  }

  async findorganizationroles(organization_id:string){
  try{

  return await this.RoleModel.find({"organization_id":organization_id})
   }
    catch 
    {
     throw new NotFoundException("organization roles not exist")
    }
  }

  async update_multiple_role_permission(update_role_permission: Update_role_Permission) {
    try{
      
      for (let i=0;i<update_role_permission.roles_permission.length;i++){

        await this.RoleModel.updateOne({_id:update_role_permission.roles_permission[i].id},{$set:{"permission":update_role_permission.roles_permission[i].permission}});
     
      }
      return "updated successfully";
      }
    catch
      {
     throw new NotFoundException("role not exist")
      }
  }
}

