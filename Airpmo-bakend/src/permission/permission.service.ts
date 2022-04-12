import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Permission, PermissionDocument } from 'src/schemas/permission.schema';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';

@Injectable()
export class PermissionService {
  constructor(
    @InjectModel(Permission.name)
    private PermissionModel: SoftDeleteModel<PermissionDocument>,
  ) {}

  async create(createPermissionDto: CreatePermissionDto) {
    const createplan = new this.PermissionModel(createPermissionDto);
    return await createplan.save();
  }

  async findAll() {
    return await this.PermissionModel.find();
  }

  async findOne(id: string) {
    try {
      return await this.PermissionModel.findOne({ _id: id });
    } catch {
      throw new NotFoundException('Permission not exist');
    }
  }

  async update(id: string, updatePermissionDto: UpdatePermissionDto) {
    try {
      await this.PermissionModel.updateOne(
        { _id: id },
        { $set: { ...updatePermissionDto } },
      );
      return await this.PermissionModel.findOne({ _id: id });
    } catch {
      throw new NotFoundException('permission not exist');
    }
  }

  async remove(id: string) {
    try {
      const data = await this.PermissionModel.softDelete({ _id: id });
      // if (!data.deletedCount) {
      //   return 'object not exist';
      // }
      return 'deleted seccessfully';
    } catch {
      throw new NotFoundException('permission not exist');
    }
  }
}
