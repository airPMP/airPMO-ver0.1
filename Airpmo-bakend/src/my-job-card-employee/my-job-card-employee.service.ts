import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  myjobcardemployee,
  myjobcardemployeeDocument,
} from 'src/schemas/my-job-card-employee.schema';
import { CreateMyJobCardEmployeeDto } from './dto/create-my-job-card-employee.dto';
import { UpdateMyJobCardEmployeeDto } from './dto/update-my-job-card-employee.dto';

@Injectable()
export class MyJobCardEmployeeService {
  constructor(
    @InjectModel(myjobcardemployee.name)
    private myjobcardemployeemodal: Model<myjobcardemployeeDocument>,
  ) {}

  async create(createMyJobCardEmployeeDto: CreateMyJobCardEmployeeDto) {
    try {
      const register_employee = await this.myjobcardemployeemodal.create(
        createMyJobCardEmployeeDto,
      );
      return register_employee;
    } catch {
      throw new NotFoundException('employee not found');
    }
  }

  async findAll() {
    try {
      return await this.myjobcardemployeemodal.find();
    } catch {
      throw new NotFoundException('employee not found');
    }
  }

  async findOne(id: string) {
    try {
      const find_one_employee = await this.myjobcardemployeemodal.findOne({
        _id: id,
      });
      return find_one_employee;
    } catch {
      throw new NotFoundException('employee not found');
    }
  }

  async update(
    id: string,
    updateMyJobCardEmployeeDto: UpdateMyJobCardEmployeeDto,
  ) {
    try {
      const update_employee = await this.myjobcardemployeemodal.updateOne(
        { _id: id },
        { ...updateMyJobCardEmployeeDto },
      );
      return 'employee update sucessfully';
    } catch {
      throw new NotFoundException('employee not updated');
    }
  }

  async remove(id: string) {
    return await this.myjobcardemployeemodal.remove({ _id: id });
  }

  async findemployeebyjcid(id: string) {
    try {
      var new_arr = [];
      const employe = await this.myjobcardemployeemodal.find();
      for (let i = 0; i < employe.length; i++) {
        if (employe[i].jc_id === id) {
          new_arr.push(employe[i]);
        }
      }
      if (new_arr.length != 0) {
        return new_arr;
      } else {
        throw new NotFoundException('not record available');
      }
    } catch {
      throw new NotFoundException('employee not found');
    }
  }
}
