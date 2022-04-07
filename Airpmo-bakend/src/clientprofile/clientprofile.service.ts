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

@Injectable()
export class ClientprofileService {
  constructor(
    @InjectModel(Client.name) private clientModel: Model<ClientDocument>,
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
      for (let index = 0; index < find_client.length; index++) {
        if (find_client[index].organization_id === organizationkey||airmpo_designation==="Airpmo Super Admin") {
          new_arr.push(find_client[index]);
        }
      }
      return new_arr;
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
      if (client.organization_id === organizationkey||airmpo_designation==="Airpmo Super Admin") {
        return client;
      } else {
        throw new UnprocessableEntityException(
          'these client  not exist in this orgainization',
        );
      }
    } catch {
      throw new NotFoundException('client not exist');
    }
  }

  async update(id: string, updateClientprofileDto: UpdateClientprofileDto) {
    try {
      const client = await this.clientModel.updateOne(
        { _id: id },
        { ...updateClientprofileDto },
      );
      return {
        massage: ' Updated ',
      };
    } catch {
      throw new NotFoundException('client not exist');
    }
  }

  async remove(id: string) {
    try {
      const client = await this.clientModel.deleteOne({ _id: id });
      return {
        massage: ' Deleted ',
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
