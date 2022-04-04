import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  equipment,
  myjobcardequipmentDocument,
} from 'src/schemas/my-job-card-equipment.schema';
import { CreateMyJobCardEquipmentDto } from './dto/create-my-job-card-equipment.dto';
import { UpdateMyJobCardEquipmentDto } from './dto/update-my-job-card-equipment.dto';

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

  async findAll() {
    try {
      return await this.myjobcardequipmentmodal.find();
    } catch {
      throw new NotFoundException('equipment not found');
    }
  }

  async findOne(id: string) {
    try {
      const find_one_equipment = await this.myjobcardequipmentmodal.findOne({
        _id: id,
      });
      return find_one_equipment;
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

  async findemployeebyjcid(id: string) {
    try {
      var new_arr = [];
      const equipment = await this.myjobcardequipmentmodal.find();
      for (let i = 0; i < equipment.length; i++) {
        if (equipment[i].jc_id === id) {
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
