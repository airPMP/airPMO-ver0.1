import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { orgainization, orgainizationDocument } from 'src/schemas/organization.schema';
import { CreateOrgainizationDto } from './dto/create-orgainization.dto';
import { UpdateOrgainizationDto } from './dto/update-orgainization.dto';

@Injectable()
export class OrgainizationService {
  constructor(@InjectModel(orgainization.name) private orgainizationmodel:Model<orgainizationDocument>) {}
 
  create(createOrgainizationDto: CreateOrgainizationDto) {
    console.log(createOrgainizationDto)
    return this.orgainizationmodel.create(createOrgainizationDto)
  }

  findAll() {
    return this.orgainizationmodel.find();
  }

 async findOne(id: string) {

 try{
    const orgainizationf = await this.orgainizationmodel.findById({"_id":id})
    return orgainizationf 
 }catch{
   throw new NotFoundException("oraganization is not exist")
 }
  }

  async update(id: string, updateOrgainizationDto: UpdateOrgainizationDto) {
    try{
   const orgainizationu = await this.orgainizationmodel.updateMany({"_id":id},{...updateOrgainizationDto})
   return{
     "massage":"oraganization updated"
   }
  }catch{
    throw new NotFoundException("oraganization is not exist")
  }
  }
 async remove(id: string) {
    try{
   const orgainizationd = await this.orgainizationmodel.deleteOne({"_id":id})
   return{
     "massage":"orgainization Deleted"
   }
  }catch{
    throw new NotFoundException("oraganization is not exist")
  }
  }
}
