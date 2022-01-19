import { Injectable } from '@nestjs/common';
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

  findOne(id: string) {
    return this.orgainizationmodel.findById({"_id":id})
  }

  update(id: string, updateOrgainizationDto: UpdateOrgainizationDto) {
   const user =this.orgainizationmodel.updateMany({"_id":id},{...updateOrgainizationDto})
   
  }
  remove(id: string) {
   return this.orgainizationmodel.deleteOne({"_id":id})
    
  }
}
