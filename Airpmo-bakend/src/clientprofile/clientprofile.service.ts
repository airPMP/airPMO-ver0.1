import {
  Injectable,
  NotFoundException,
  Req,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { name } from 'ejs';
import { Model } from 'mongoose';
import { Client, ClientDocument } from 'src/schemas/client.schema';
import { CreateClientprofileDto } from './dto/create-clientprofile.dto';
import { UpdateClientprofileDto } from './dto/update-clientprofile.dto';
import { Base64, encode } from 'js-base64';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';

@Injectable()
export class ClientprofileService {
  constructor(
    @InjectModel(Client.name)
    private clientModel: SoftDeleteModel<ClientDocument>,
  ) {}

  async create(createClientprofileDto: CreateClientprofileDto) {
    try {
      return await this.clientModel.create(createClientprofileDto);
    } catch {
      throw new UnprocessableEntityException('');
    }
  }

  async findAll(@Req() req) {
    try {
      const new_arr = [];
      const payload = req.headers.authorization.split('.')[1];
      const encodetoken = Base64.decode(payload);
      var obj = JSON.parse(encodetoken);
      var organizationkey = obj.organization_id;
      var airmpo_designation = obj.roles[0];
      if (organizationkey === undefined || organizationkey === null) {
        throw new UnprocessableEntityException('organization not found');
      }
      const find_client = await this.clientModel.find();
      if (find_client.length != 0) {
        for (let index = 0; index < find_client.length; index++) {
          if (
            find_client[index].organization_id === organizationkey ||
            airmpo_designation === 'Airpmo Super Admin'
          ) {
            new_arr.push(find_client[index]);
          }
        }
        return new_arr;
      } else {
        return new NotFoundException('client not exist');
      }
    } catch {
      throw new NotFoundException('client not exist');
    }
  }

  async findOne(id: string, @Req() req) {
    try {
      const new_arr = [];
      const payload = req.headers.authorization.split('.')[1];
      const encodetoken = Base64.decode(payload);
      var obj = JSON.parse(encodetoken);
      var organizationkey = obj.organization_id;
      var airmpo_designation = obj.roles[0];
      const client = await this.clientModel.findOne({ _id: id });
      if (client != null) {
        if (
          client.organization_id === organizationkey ||
          airmpo_designation === 'Airpmo Super Admin'
        ) {
          return client;
        } else {
          return new UnprocessableEntityException(
            'these client  not exist in this orgainization',
          );
        }
      } else {
        return new NotFoundException('client not exist');
      }
    } catch {
      throw new NotFoundException('client not exist');
    }
  }

  async update(id: string, updateClientprofileDto: UpdateClientprofileDto) {
    try {
      const client_find = await this.clientModel.findOne({ _id: id });
      if (client_find != null) {
        const client = await this.clientModel.updateOne(
          { _id: id },
          { ...updateClientprofileDto },
        );
        return {
          massage: ' Updated ',
        };
      }else{
        return new NotFoundException('unable to update data not found')
      }
    } catch {
      throw new NotFoundException('client not exist');
    }
  }

  async remove(id: string) {
    try {
      const find_client=await this.clientModel.findOne({ _id: id })
       if(find_client!=null){
      const client =await this.clientModel.softDelete({ _id: id });
      return {
        massage: ' Deleted ',
      }
      
    }else{
      return new NotFoundException("unable to delete data not found")
    };
    } catch {
      throw new NotFoundException('client not exist');
    }
  
  }

  async findorganization(organization_id: string) {
    try {
      const organization = await this.clientModel.find({
        orgainization_id: organization_id,
      });
      return organization;
    } catch {
      throw new NotFoundException('client not exist in this organization');
    }
  }
}
