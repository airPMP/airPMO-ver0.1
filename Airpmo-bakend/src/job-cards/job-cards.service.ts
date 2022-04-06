import {
  Body,
  Injectable,
  NotAcceptableException,
  NotFoundException,
  Param,
  Post,
  Req,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { setPriority } from 'os';
import { map } from 'rxjs';
import { jobcard, jobcardDocuments } from 'src/schemas/job_card.schema';
import {
  jobcardassign,
  jobcardassignDocuments,
} from 'src/schemas/job_card_assigen.schema';
import { myjobcard, myjobcardDocument } from 'src/schemas/my_job_card.schema';
import { Role, RoleDocument } from 'src/schemas/roles.schema';
import { users, ussersDocument } from 'src/schemas/users.schema';
import { UserRole, UserRoleDocument } from 'src/schemas/user_roles.schema';
import { assignJobCardDto } from './dto/assign-job-card.dto';
import { CreateJobCardDto } from './dto/create-job-card.dto';
import { createmyjobcardDto } from './dto/my-job-card-dto';
import { UpdateJobCardDto } from './dto/update-job-card.dto';
import { Base64, encode } from 'js-base64';

@Injectable()
export class JobCardsService {
  constructor(
    @InjectModel(jobcard.name) private jobcardmodal: Model<jobcardDocuments>,
    @InjectModel(jobcardassign.name)
    private assignjobcardmodal: Model<jobcardassignDocuments>,
    @InjectModel(myjobcard.name)
    private myjobcardmodal: Model<myjobcardDocument>,
    @InjectModel(UserRole.name) private UserRoleModel: Model<UserRoleDocument>,
    @InjectModel(Role.name) private RoleModel: Model<RoleDocument>,
  ) {}

  async createjobCard(CreateJobCardDto: CreateJobCardDto) {
    try {
      const job_card = await this.jobcardmodal.create(CreateJobCardDto);
      return job_card;
    } catch {
      throw new NotFoundException('Not found data');
    }
  }

  async findjobCard(id: string, @Req() req) {
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
      const find_Card = await this.jobcardmodal.findOne({ _id: id });
      if (find_Card.organization_id === organizationkey||airmpo_designation==="Airpmo Super Admin") {
        return find_Card;
      } else {
        throw new UnprocessableEntityException(
          'its not exist in this orgainization',
        );
      }
    } catch {
      throw new NotFoundException('Not found data');
    }
  }

  async findjob(@Req() req) {
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
      const find_all_job_card = await this.jobcardmodal.find().lean();
      for (let index = 0; index < find_all_job_card.length; index++) {
        if (find_all_job_card[index].organization_id === organizationkey||airmpo_designation==="Airpmo Super Admin") {
          new_arr.push(find_all_job_card[index]);
        }
      }
      return new_arr;
    } catch {
      throw new NotFoundException('Not found data');
    }
  }

  async deleteJobcard(@Param('id') id: string) {
    try {
      const check_card = await this.jobcardmodal.findOne({ _id: id });
      if (check_card) {
        const delete_card = await this.jobcardmodal.deleteOne({ _id: id });
        return 'delete sucessfully';
      } else {
        throw new NotFoundException('data not found');
      }
    } catch {
      throw new NotFoundException('Not found data');
    }
  }

  async updatejobcard(id: string, @Body() UpdateJobCardDto: UpdateJobCardDto) {
    try {
      return await this.jobcardmodal.updateOne(
        { _id: id },
        { ...UpdateJobCardDto },
      );
    } catch {
      throw new NotFoundException('Not found data');
    }
  }

  async assignjobcard(assignJobCardDto: assignJobCardDto) {
    try {
      const job_card_assigen = await this.assignjobcardmodal.create(
        assignJobCardDto,
      );
      return job_card_assigen;
    } catch {
      throw new NotFoundException('data not found');
    }
  }

  async getassignjobcard(id: string, @Req() req) {
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
      const get_job_card = await this.assignjobcardmodal.findOne({ _id: id });
      if (get_job_card.organization_id === organizationkey||airmpo_designation==="Airpmo Super Admin") {
        return get_job_card;
      } else {
        throw new UnprocessableEntityException(
          'its not exist in this orgainization',
        );
      }
    } catch {
      throw new NotFoundException('data not found');
    }
  }

  async assignuserdata(id: string, @Req() req) {
    try {
      var new_arr = [];
      var arr1 = [];
      var arr = [];
      const payload = req.headers.authorization.split('.')[1];
      const encodetoken = Base64.decode(payload);
      var obj = JSON.parse(encodetoken);
      var organizationkey = obj.organization_id;
      var airmpo_designation = obj.roles[0];
      if (organizationkey === undefined || organizationkey === null) {
        throw new UnprocessableEntityException('organization not found');
      }
      const findalldata = await this.assignjobcardmodal.find();
      findalldata?.map((item, id) => {
        item?.assign_data?.map((item2, ids) => {
          arr1.push(item2);
        });
      });

      for (let index = 0; index < arr1.length; index++) {
        if (arr1[index].organization_id === organizationkey||airmpo_designation==="Airpmo Super Admin") {
          arr.push(arr1[index]);
        }
      }
      for (let i = 0; i < arr.length; i++) {
        const id = arr[i]._id.toString();

        var find = await this.myjobcardmodal.findOne({ jc_number: id }).lean();
        if (find != null) {
          const new_obj = {
            current_quantity_to_be_achieved:
              find.current_quantity_to_be_achieved,
            cpi: find.cpi,
            spi: find.spi,
          };
          const obj = Object.assign({}, arr[i], new_obj);
          new_arr.push(obj);
        } else {
          new_arr.push(arr[i]);
        }
      }
      const finduser = await this.UserRoleModel.find();
      for (let i = 0; i < finduser.length; i++) {
        if (finduser[i].user_id === id) {
          const findroles = await this.RoleModel.findOne({
            _id: finduser[i].role_id,
          });
          var ab = findroles.permission;
          for (let j = 0; j <= ab.length; j++) {
            if (ab[j] === 'ALL') {
              return new_arr;
            } else {
              const variableOne = new_arr.filter(
                (itemInArray) => itemInArray.assign_user_id === id,
              );
              return variableOne;
            }
          }
        }
      }
    } catch {
      throw new UnprocessableEntityException('data not found');
    }
  }

  async findallassigncard(@Req() req) {
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
      const find_all_asign_card = await this.assignjobcardmodal.find();
      for (let index = 0; index < find_all_asign_card.length; index++) {
        if (find_all_asign_card[index].organization_id === organizationkey||airmpo_designation==="Airpmo Super Admin") {
          new_arr.push(find_all_asign_card[index]);
        }
      }
      return new_arr;
    } catch {
      throw new NotFoundException('data not found');
    }
  }

  async createmyjobcard(createmyjobcardDto: createmyjobcardDto) {
    return await this.myjobcardmodal.create(createmyjobcardDto);
  }

  async findmyjobcard(id: string, @Req() req) {
    try {
      const payload = req.headers.authorization.split('.')[1];
      const encodetoken = Base64.decode(payload);
      var obj = JSON.parse(encodetoken);
      var organizationkey = obj.organization_id;
      var airmpo_designation = obj.roles[0];
      if (organizationkey === undefined || organizationkey === null) {
        throw new UnprocessableEntityException('organization not found');
      }
      const find_my_job = await this.myjobcardmodal.findOne({ _id: id });
      if (find_my_job.organization_id === organizationkey||airmpo_designation==="Airpmo Super Admin") {
        return find_my_job;
      } else {
        throw new UnprocessableEntityException(
          'its not exist in this orgainization',
        );
      }
    } catch {
      throw new NotFoundException('my job card not found');
    }
  }

  async myjobcard(@Req() req) {
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
      const get_all_my_job_card = await this.myjobcardmodal.find();
      for (let index = 0; index < get_all_my_job_card.length; index++) {
        if (get_all_my_job_card[index].organization_id === organizationkey||airmpo_designation==="Airpmo Super Admin") {
          new_arr.push(get_all_my_job_card[index]);
        }
      }
      return new_arr;
    } catch {
      throw new NotFoundException('my job card not found ');
    }
  }
}
