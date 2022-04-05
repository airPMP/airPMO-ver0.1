import { Injectable, NotFoundException, Req } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role, RoleDocument } from 'src/schemas/roles.schema';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Update_role_Permission } from './dto/update_permission-role.dto';
import { Base64, encode } from 'js-base64';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role.name) private RoleModel: Model<RoleDocument>) {}
  async create(createRoleDto: CreateRoleDto) {
    if (createRoleDto.roles_data) {
      for (let i = 0; i < createRoleDto.roles_data.length; i++) {
        createRoleDto.name = createRoleDto.roles_data[i];
        const create = new this.RoleModel(createRoleDto);
        await create.save();
      }
      return await this.RoleModel.find();
    } else {
      const find = await this.RoleModel.findOne({ name: createRoleDto.name });
      if (find) {
        throw new NotFoundException('roles all ready register ');
      } else {
        const create = new this.RoleModel(createRoleDto);
        return await create.save();
      }
    }
  }

  async findAll(@Req() req) {
    const new_arr = [];
    const payload = req.headers.authorization.split('.')[1];
    const encodetoken = Base64.decode(payload);
    var obj = JSON.parse(encodetoken);
    var organizationkey = obj.organization_id;
    const all_roles = await this.RoleModel.find();
    for (let index = 0; index < all_roles.length; index++) {
      if (all_roles[index].organization_id === organizationkey) {
        new_arr.push(all_roles[index]);
      }
    }
    return new_arr;
  }

  async findOne(id: string) {
    try {
      return await this.RoleModel.findOne({ _id: id });
    } catch {
      throw new NotFoundException('role not exist');
    }
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    try {
      await this.RoleModel.updateOne(
        { _id: id },
        { $set: { ...updateRoleDto } },
      );
      return await this.RoleModel.findOne({ _id: id });
    } catch {
      throw new NotFoundException('role not exist');
    }
  }

  async remove(id: string) {
    try {
      const data = await this.RoleModel.deleteOne({ _id: id });
      if (!data.deletedCount) {
        return 'object not exist';
      }
      return 'deleted seccessfully';
    } catch {
      throw new NotFoundException('role not exist');
    }
  }

  async projectroles(project_id: string,@Req() req) {
    try {
      const new_arr = [];
    const payload = req.headers.authorization.split('.')[1];
    const encodetoken = Base64.decode(payload);
    var obj = JSON.parse(encodetoken);
    var organizationkey = obj.organization_id;
       const roles= await this.RoleModel.find({ project_id: project_id });
       for (let index = 0; index < roles.length; index++) {
        if ( roles[index].organization_id === organizationkey) {
          new_arr.push( roles[index]);
        }
      }
      return new_arr;
    } catch {
      throw new NotFoundException('project role not exist');
    }
  }

  async findorganizationroles(organization_id: string) {
    try {
      return await this.RoleModel.find({ organization_id: organization_id });
    } catch {
      throw new NotFoundException('organization roles not exist');
    }
  }

  async update_multiple_role_permission(
    update_role_permission: Update_role_Permission,
  ) {
    try {
      for (let i = 0; i < update_role_permission.roles_permission.length; i++) {
        await this.RoleModel.updateOne(
          { _id: update_role_permission.roles_permission[i].id },
          {
            $set: {
              permission: update_role_permission.roles_permission[i].permission,
            },
          },
        );
      }
      return 'updated successfully';
    } catch {
      throw new NotFoundException('role not exist');
    }
  }
}
