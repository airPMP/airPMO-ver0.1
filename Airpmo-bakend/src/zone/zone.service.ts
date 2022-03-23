import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { zone, zoneDocument } from 'src/schemas/zone.schema';
import { CreateZoneDto } from './dto/create-zone.dto';
import { UpdateZoneDto } from './dto/update-zone.dto';

@Injectable()
export class ZoneService {
  constructor(@InjectModel(zone.name) private zoneModel: Model<zoneDocument>) { }
  async create(createZoneDto: CreateZoneDto) {
    try{

    
    return await this.zoneModel.create(createZoneDto)
    }catch{
      throw new  NotFoundException("zone not exist ")
    }
  }

  async findAll() {
    return await this.zoneModel.find();
  }

  async findOne(id: string) {
    try {
      const zone = await this.zoneModel.findOne({ "_id": id })
      return zone
    }
    catch {
      throw new NotFoundException("Zone is not exist")
    }

  }

  async update(id: string, updateZoneDto: UpdateZoneDto) {
    try {
      const updatedzone = await this.zoneModel.updateMany({ "_id": id }, { ...updateZoneDto })
      return updatedzone
    }
    catch {
      throw new NotFoundException("zone is not exist")
    }
  }

  async remove(id: string) {
    try {
      const deletezone = await this.zoneModel.remove({ "_id": id })
      return {
        "massage": "deleted sucessfully"
      }
    } catch {
      throw new NotFoundException("zone is not exist")
    }
  }


 async findorganization(organization_id:string){
   const organizationdata = await this.zoneModel.find({"organization_id":organization_id})
   return organizationdata
 }

 async findproject(project_id:string){
  const projectdata = await this.zoneModel.find({"project_id":project_id})
  return projectdata
}
}
