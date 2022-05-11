import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import {
  orgainization,
  orgainizationDocument,
} from 'src/schemas/organization.schema';
import { users, ussersDocument } from 'src/schemas/users.schema';
import { UsersService } from 'src/users/users.service';
import { CreateOrgainizationDto } from './dto/create-orgainization.dto';
import { UpdateOrgainizationDto } from './dto/update-orgainization.dto';

@Injectable()
export class OrgainizationService {
  constructor(
    @InjectModel(orgainization.name)
    private orgainizationmodel: SoftDeleteModel<orgainizationDocument>,
    @InjectModel(users.name) private usersModel:SoftDeleteModel<ussersDocument>, 
  ) {}

  async create(createOrgainizationDto: CreateOrgainizationDto) {
    const find_admin= await this.usersModel.findOne({_id:createOrgainizationDto.user_id})
    if(find_admin!=null){
      const find_organization = await this.orgainizationmodel.findOne({
      user_id: createOrgainizationDto.user_id,
    });
    if (find_organization === null) {
      const data=await this.orgainizationmodel.create(createOrgainizationDto);
      const organization1=  (data._id).toString()
      const logo_url1=data.logo_url
      const a = await this.usersModel.updateOne({_id:createOrgainizationDto.user_id},{organization_id:organization1,logo_url:logo_url1})
       return data
    } else {
      throw new NotFoundException('organization already exist');
    }
  }else{
    return new NotFoundException('user id not exist')
  }
  }

  findAll() {
    return this.orgainizationmodel.find();
  }

  async findOne(id: string) {
    try {
      const orgainizationf = await this.orgainizationmodel.findById({
        _id: id,
      });
      return orgainizationf;
    } catch {
      throw new NotFoundException('oraganization is not exist');
    }
  }

  async update(id: string, updateOrgainizationDto: UpdateOrgainizationDto) {
    try {
      const find_admin= await this.usersModel.findOne({_id:updateOrgainizationDto.user_id})
      if(find_admin!=null){
      const orgainizationu = await this.orgainizationmodel.updateMany(
        { _id: id },
        { ...updateOrgainizationDto },
      );
      const a = await this.usersModel.updateOne({_id:updateOrgainizationDto.user_id},{logo_url:updateOrgainizationDto.logo_url})
      return {
        massage: 'oraganization updated',
      };
    }else{
       return new NotFoundException('user id not exist')
    }
    } catch {
      throw new NotFoundException('oraganization is not exist');
    }
  }
  async remove(id: string) {
    try {
      const orgainizationd = await this.orgainizationmodel.softDelete({
        _id: id,
      });
      return {
        massage: 'orgainization Deleted',
      };
    } catch {
      throw new NotFoundException('oraganization is not exist');
    }
  }

  async finduser(user_id: string) {
    const finduser = await this.orgainizationmodel.find({ user_id: user_id });
    return finduser;
  }
}
