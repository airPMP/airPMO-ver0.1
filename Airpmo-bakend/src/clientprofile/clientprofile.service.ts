import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { name } from 'ejs';
import { Model } from 'mongoose';
import { Client, ClientDocument } from 'src/schemas/client.schema';
import { CreateClientprofileDto } from './dto/create-clientprofile.dto';
import { UpdateClientprofileDto } from './dto/update-clientprofile.dto';

@Injectable()
export class ClientprofileService {
 constructor(@InjectModel(Client.name) private clientModel: Model<ClientDocument>){}


 async create(createClientprofileDto: CreateClientprofileDto) {
   return await this.clientModel.create(createClientprofileDto)
  }

 async findAll() {
   
  return await this.clientModel.find()
  }

 async findOne(id: string) {
   try{
   const client = await this.clientModel.findOne({ "_id": id })
   return client
   }catch{
     throw new NotFoundException("client not exist")
   }
  }

 async update(id: string, updateClientprofileDto: UpdateClientprofileDto) {
   try{
    const client=  await this.clientModel.updateOne({"_id":id},{...updateClientprofileDto})
    return {
      "massage":" Updated "
    }
  }catch{
    throw new NotFoundException("client not exist")
  }
  }

 async remove(id:string) {
   try {
    const client= await this.clientModel.deleteOne({ "_id":id })
    return {
      "massage":" Deleted "
    }
   } catch {
     throw new NotFoundException("client not exist")
   }
  
  }


  async findorganization(organization_id:string){
    const organization = await this.clientModel.find({"orgainization_id":organization_id})
    return organization
  }
}
