import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { subzone, subzoneDocument } from 'src/schemas/subzone.schema';
import { CreateSubzoneDto } from './dto/create-subzone.dto';
import { UpdateSubzoneDto } from './dto/update-subzone.dto';

@Injectable()
export class SubzoneService {
  constructor(@InjectModel(subzone.name) private subzoneModel: Model<subzoneDocument>){}
 async create(createSubzoneDto: CreateSubzoneDto) {
    return await this.subzoneModel.create(createSubzoneDto)
  }

 async findAll() {
    return await this.subzoneModel.find()
  }

 async findOne(id: string) {
   try{
   const subzone = await this.subzoneModel.findOne({"_id":id})
   return subzone 
  }catch{
    throw new NotFoundException("subzone is not exist")
  }
   
  }

 async update(id: string, updateSubzoneDto: UpdateSubzoneDto) {
   try{
    const subzoneupdated= await this.subzoneModel.updateMany({"_id":id},{...updateSubzoneDto})
    return subzoneupdated
   }catch{
    throw new NotFoundException("subzone is not exist")
   }

  }

 async remove(id: string) {
   try{
    const deletezone = await this.subzoneModel.deleteOne({"_id":id})
    return deletezone
   }catch{
    throw new NotFoundException("subzone is not exist")
   }
  
  }


async findsubzone(zone_id: string){
  const findzone =  await this.subzoneModel.find({"zone_id":zone_id})
  return findzone
}

async findorganization(organization_id: string){
  const organization =  await this.subzoneModel.find({"organization_id":organization_id})
  return organization
}
}
