import { Injectable } from '@nestjs/common';
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
   return await this.clientModel.findOne({ "_id": id })
  }

 async update(id: string, updateClientprofileDto: UpdateClientprofileDto) {
    const user=  await this.clientModel.updateOne({"_id":id},{"category":updateClientprofileDto.category, "client_name":updateClientprofileDto.client_name , "location":updateClientprofileDto.location,"upload_logo_file":updateClientprofileDto.upload_logo_file,  "add_new_feild":updateClientprofileDto.add_new_feild, "discription":updateClientprofileDto.discription,"client_id":updateClientprofileDto.client_id,"contact_no":updateClientprofileDto.contact_no,"orgainization_id":updateClientprofileDto.orgainization_id})
    return {
      "massage":" Updated "
    }
  }

 async remove(id:string) {
  const deleteuser= await this.clientModel.deleteOne({ "_id":id })
    return {
      "massage":" Deleted "
    }
  }
}
