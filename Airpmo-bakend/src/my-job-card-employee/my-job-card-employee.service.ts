import {
  Injectable,
  NotFoundException,
  Req,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  myjobcardemployee,
  myjobcardemployeeDocument,
} from 'src/schemas/my-job-card-employee.schema';
import { CreateMyJobCardEmployeeDto } from './dto/create-my-job-card-employee.dto';
import { UpdateMyJobCardEmployeeDto } from './dto/update-my-job-card-employee.dto';
import { Base64, encode } from 'js-base64';

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
      const all_employee = await this.myjobcardemployeemodal.find();
      for (let index = 0; index < all_employee.length; index++) {
        if (
          all_employee[index].organization_id === organizationkey ||
          airmpo_designation === 'Airpmo Super Admin'
        ) {
          new_arr.push(all_employee[index]);
        }
      }
      return new_arr;
    } catch {
      throw new NotFoundException('employee not found');
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
      const find_one_employee = await this.myjobcardemployeemodal.findOne({
        _id: id,
      });
      if (
        find_one_employee.organization_id === organizationkey ||
        airmpo_designation === 'Airpmo Super Admin'
      ) {
        return find_one_employee;
      } else {
        throw new UnprocessableEntityException(
          'its not exist in this orgainization',
        );
      }
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

  async findemployeebyjcid(id: string, @Req() req) {
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
      const employe = await this.myjobcardemployeemodal.find();

      for (let i = 0; i < employe.length; i++) {
        if (employe[i].jc_id === id) {
          if (
            employe[i].organization_id === organizationkey ||
            airmpo_designation === 'Airpmo Super Admin'
          ) {
            new_arr.push(employe[i]);
          }
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
