import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import {
  orgainization,
  orgainizationDocument,
} from 'src/schemas/organization.schema';
import { CreateOrgainizationDto } from './dto/create-orgainization.dto';
import { UpdateOrgainizationDto } from './dto/update-orgainization.dto';

@Injectable()
export class OrgainizationService {
  constructor(
    @InjectModel(orgainization.name)
    private orgainizationmodel: SoftDeleteModel<orgainizationDocument>,
  ) {}

  async create(createOrgainizationDto: CreateOrgainizationDto) {
    const find_organization = await this.orgainizationmodel.findOne({
      user_id: createOrgainizationDto.user_id,
    });
    if (find_organization === null) {
      return this.orgainizationmodel.create(createOrgainizationDto);
    } else {
      throw new NotFoundException('organization already exist');
    }
  }

 async findAll() {
    const data= await  this.orgainizationmodel.find();
     if(data.length!=0){
       return data
     }else{
       return new NotFoundException('unable to find organization data')
     }
  }

  async findOne(id: string) {
    try {
      const find_org= await this.orgainizationmodel.findOne({_id: id})
      console.log(find_org)
      if(find_org!=null){
      const orgainizationf = await this.orgainizationmodel.findById({
        _id: id,
      });
      return orgainizationf;
    }else{
      return new NotFoundException('unable to find organization data')
    }
    } catch {
      throw new NotFoundException('oraganization is not exist');
    }
  }

  async update(id: string, updateOrgainizationDto: UpdateOrgainizationDto) {
    try {
      const find_org= await this.orgainizationmodel.findOne({_id: id})
      if(find_org!=null){
      const orgainizationu = await this.orgainizationmodel.updateOne(
        { _id: id },
        { ...updateOrgainizationDto },
      );
      return {
        massage: 'oraganization updated',
      }
    }else{
      return new NotFoundException('unable to find organization data')
    }
    } catch {
      throw new NotFoundException('oraganization is not exist');
    }
  }
  async remove(id: string) {
    try {
      const find_org= await this.orgainizationmodel.findOne({_id: id})
      if(find_org!=null){
      const orgainizationd = await this.orgainizationmodel.softDelete({
        _id: id,
      });
      return {
        massage: 'orgainization Deleted',
      }
    }else{
      return new NotFoundException('unable to find organization data')
    }
    } catch {
      throw new NotFoundException('oraganization is not exist');
    }
  }

  async finduser(user_id: string) {
    const finduser = await this.orgainizationmodel.find({ user_id: user_id });
    if(finduser.length!=0){
      return finduser
    }else{
      return new NotFoundException('unable to find organization data')
    }
  }
}
