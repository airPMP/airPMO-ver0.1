import { Injectable, NotFoundException, Req, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  equipment,
  myjobcardequipmentDocument,
} from 'src/schemas/my-job-card-equipment.schema';
import { CreateMyJobCardEquipmentDto } from './dto/create-my-job-card-equipment.dto';
import { UpdateMyJobCardEquipmentDto } from './dto/update-my-job-card-equipment.dto';
import { Base64, encode } from 'js-base64';

@Injectable()
export class MyJobCardEquipmentService {
  constructor(
    @InjectModel(equipment.name)
    private myjobcardequipmentmodal: Model<myjobcardequipmentDocument>,
  ) {}

  async create(createMyJobCardEquipmentDto: CreateMyJobCardEquipmentDto) {
    try {
      const register_equipment = await this.myjobcardequipmentmodal.create(
        createMyJobCardEquipmentDto,
      );
      return register_equipment;
    } catch {
      throw new NotFoundException('equipment not found');
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
      const all_my_job_card_eqipments =
        await this.myjobcardequipmentmodal.find();
      for (let index = 0; index < all_my_job_card_eqipments.length; index++) {
        if (all_my_job_card_eqipments[index].organization_id === organizationkey||airmpo_designation==="Airpmo Super Admin") {
          new_arr.push(all_my_job_card_eqipments[index]);
        }
      }
      return new_arr;
    } catch {
      throw new NotFoundException('equipment not found');
    }
  }



  async findOne(id: string, @Req() req) {
    try {
      const payload = req.headers.authorization.split('.')[1];
      const encodetoken = Base64.decode(payload);
      var obj = JSON.parse(encodetoken);
      var organizationkey = obj.organization_id;
      var airmpo_designation = obj.roles[0];
      if (organizationkey === undefined || organizationkey === null) {
        throw new UnprocessableEntityException('organization not found');
      }
      const find_one_equipment = await this.myjobcardequipmentmodal.findOne({
        _id: id,
      });
      if (find_one_equipment.organization_id === organizationkey||airmpo_designation==="Airpmo Super Admin") {
        return find_one_equipment;
      } else {
        throw new UnprocessableEntityException(
          'its not exist in this orgainization',
        );
      }
     
    } catch {
      throw new NotFoundException('equipment not found');
    }
  }



  async update(
    id: string,
    updateMyJobCardEquipmentDto: UpdateMyJobCardEquipmentDto,
  ) {
    try {
      const update_employee = await this.myjobcardequipmentmodal.updateOne(
        { _id: id },
        { ...updateMyJobCardEquipmentDto },
      );
      return 'equipments update sucessfully';
    } catch {
      throw new NotFoundException('equipment not updated');
    }
  }




  async remove(id: string) {
    return await this.myjobcardequipmentmodal.remove({ _id: id });
  }




  async findemployeebyjcid(id: string,@Req() req) {
    try {
      var new_arr = [];
      const payload = req.headers.authorization.split('.')[1];
      const encodetoken = Base64.decode(payload);
      var obj = JSON.parse(encodetoken);
      var organizationkey = obj.organization_id;
      var airmpo_designation = obj.roles[0];
      if (organizationkey === undefined || organizationkey === null) {
        throw new UnprocessableEntityException('organization not found');
      }
      const equipment = await this.myjobcardequipmentmodal.find();
      for (let i = 0; i < equipment.length; i++) {
        if (equipment[i].jc_id === id&& equipment[i].organization_id===organizationkey||airmpo_designation==="Airpmo Super Admin") {
          new_arr.push(equipment[i]);
        }
      }
      if (new_arr.length != 0) {
        return new_arr;
      } else {
        throw new NotFoundException('not record available');
      }
    } catch {
      throw new NotFoundException('equipment not found');
    }
  }
}
