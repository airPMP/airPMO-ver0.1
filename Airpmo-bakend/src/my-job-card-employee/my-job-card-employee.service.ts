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
      const employe_id=createMyJobCardEmployeeDto.employee_id
      const date=createMyJobCardEmployeeDto.date
      const recent_hour=createMyJobCardEmployeeDto.hour
      const  maximum_hour=createMyJobCardEmployeeDto.max_hour
      const employee_project_id=createMyJobCardEmployeeDto.project_id
      const user_id_data = await this.myjobcardemployeemodal.find({employee_id:employe_id,date:date,project_id:employee_project_id})
      if(user_id_data.length!=0){
       var emloyee_hour=0
       for (let index = 0; index < user_id_data.length; index++) {
        emloyee_hour=emloyee_hour+parseFloat(user_id_data[index].hour)
        }
        const total_employe_hours= emloyee_hour+parseFloat(recent_hour)
        if(total_employe_hours<=parseFloat(maximum_hour)){
         var remainig_hours= parseFloat(maximum_hour)-total_employe_hours
          if(remainig_hours>=0){
            return await this.myjobcardemployeemodal.create(createMyJobCardEmployeeDto)
          }
          else{
            return new NotFoundException('your limit is exceed')
          }
        }else{
          const remaing = parseFloat(maximum_hour)- emloyee_hour
          if(remaing===0){
          return new NotFoundException('you have exceed your limit')
          }else{
            if(remaing>0){
            return new NotFoundException(`your remaing hours is ${remaing}`)
            }else{
              return new NotFoundException(`you can not be changed maximum hours`)
            }
          }
        }
      }

    else{
        if(parseFloat(createMyJobCardEmployeeDto.hour)<=parseFloat(createMyJobCardEmployeeDto.max_hour)&&user_id_data.length===0){

          return await this.myjobcardemployeemodal.create(createMyJobCardEmployeeDto);
         
        }else{
             return {
                massage:`maximum limit is ${createMyJobCardEmployeeDto.max_hour}`
                 }
       }
      }
      // return register_employee;
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
