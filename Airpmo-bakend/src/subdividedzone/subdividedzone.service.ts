import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { subdividedzone, subdividedzoneDocument } from 'src/schemas/subdividedzone.schema';
import { CreateSubdividedzoneDto } from './dto/create-subdividedzone.dto';
import { UpdateSubdividedzoneDto } from './dto/update-subdividedzone.dto';

@Injectable()
export class SubdividedzoneService {
  constructor(@InjectModel(subdividedzone.name) private subdividedzonemodel: Model<subdividedzoneDocument>) { }
 async create(createSubdividedzoneDto: CreateSubdividedzoneDto) {
    return await this.subdividedzonemodel.create(createSubdividedzoneDto)
  }

  async findAll() {
   return await  this.subdividedzonemodel.find()
  }

 async findOne(id: string) {
    try{
   const subdividedzon = await  this.subdividedzonemodel.findOne({"_id":id})
   return subdividedzon
    }catch{
      throw new NotFoundException("sub divided zone is not exist")
    }

  }

 async update(id: string, updateSubdividedzoneDto: UpdateSubdividedzoneDto) {
   try{
    const updatesubdividedzone = await this.subdividedzonemodel.updateMany({"_id":id},{...updateSubdividedzoneDto})
    return updatesubdividedzone
   }catch{
     throw new NotFoundException("sub divided zone is not exist")
   }
  
  }

 async remove(id: string) {
    return this.subdividedzonemodel.deleteOne({"_id":id})
  }

 async findsubdivided(subzone_id:string){
   const subdividedzone = await this.subdividedzonemodel.find({"subzone_id":subzone_id})
   return subdividedzone
 }

 async findorganization(organization_id:string){
  const organization = await this.subdividedzonemodel.find({"organization_id":organization_id})
  return organization
}

}
