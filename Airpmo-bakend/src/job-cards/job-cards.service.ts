import { Body, Injectable, NotAcceptableException, NotFoundException, Param, Post, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { map } from 'rxjs';
import { jobcard, jobcardDocuments } from 'src/schemas/job_card.schema';
import { jobcardassign, jobcardassignDocuments } from 'src/schemas/job_card_assigen.schema';
import { myjobcard, myjobcardDocument } from 'src/schemas/my_job_card.schema';
import { Role, RoleDocument } from 'src/schemas/roles.schema';
import { users, ussersDocument } from 'src/schemas/users.schema';
import { UserRole, UserRoleDocument } from 'src/schemas/user_roles.schema';
import { assignJobCardDto } from './dto/assign-job-card.dto';
import { CreateJobCardDto } from './dto/create-job-card.dto';
import { createmyjobcardDto } from './dto/my-job-card-dto';
import { UpdateJobCardDto } from './dto/update-job-card.dto';

@Injectable()
export class JobCardsService {
  constructor(@InjectModel(jobcard.name) private jobcardmodal: Model<jobcardDocuments>,
    @InjectModel(jobcardassign.name) private assignjobcardmodal: Model<jobcardassignDocuments>,
    @InjectModel(myjobcard.name) private myjobcardmodal: Model<myjobcardDocument>,
    @InjectModel(UserRole.name) private UserRoleModel: Model<UserRoleDocument>,
    @InjectModel(Role.name) private RoleModel: Model<RoleDocument>) { }
  async createjobCard(CreateJobCardDto: CreateJobCardDto) {
    try {
      const job_card = await this.jobcardmodal.create(CreateJobCardDto)
      return job_card
    } catch {
      throw new NotFoundException("Not found data")
    }

  }

  async findjobCard(id: string) {
    try {
      const find_Card = await this.jobcardmodal.findOne({ _id: id })
      return find_Card
    } catch {
      throw new NotFoundException("Not found data")
    }

  }


  async findjob() {
    try {
      const find_all_job_card = await this.jobcardmodal.find()
      return find_all_job_card
    } catch {
      throw new NotFoundException("Not found data")
    }
  }


  async deleteJobcard(@Param('id') id: string) {
    try {
      const check_card = await this.jobcardmodal.findOne({ _id: id })
      if (check_card) {
        const delete_card = await this.jobcardmodal.deleteOne({ _id: id })
        return "delete sucessfully"
      }
      else {
        throw new NotFoundException('data not found')
      }
    } catch {
      throw new NotFoundException('Not found data')
    }
  }


  async updatejobcard(id: string, @Body() UpdateJobCardDto: UpdateJobCardDto) {
    try {
      return await this.jobcardmodal.updateOne({ _id: id }, { ...UpdateJobCardDto })
    } catch {
      throw new NotFoundException("Not found data")
    }
  }


  async assignjobcard(assignJobCardDto: assignJobCardDto) {
    try {
      const job_card_assigen = await this.assignjobcardmodal.create(assignJobCardDto)
      return job_card_assigen
    } catch {
      throw new NotFoundException('data not found')
    }

  }



  async getassignjobcard(id: string) {
    try {
      const get_job_card = await this.assignjobcardmodal.findOne({ _id: id })
      return get_job_card
    } catch {
      throw new NotFoundException('data not found')
    }

  }

  async assignuserdata(id: string) {
    try {
      const findalldata = await this.assignjobcardmodal.find()
      var arr = []
      findalldata?.map((item, id) => {
        item?.assign_data?.map((item2, ids) => {
          arr.push(item2)
        })
      })

      const finduser = await this.UserRoleModel.find()
      for (let i = 0; i < finduser.length; i++) {
        if (finduser[i].user_id === id) {
          const findroles = await this.RoleModel.findOne({ _id: finduser[i].role_id })
          var ab = findroles.permission
          for (let j = 0; j <= ab.length; j++) {
            if (ab[j] === "ALL") {
              return arr
            }
            else {
              const variableOne = arr.filter(itemInArray => itemInArray.assign_user_id === id);
              return variableOne
            }
          }
        }
      }
    } catch {
      throw new UnprocessableEntityException('data not found')
    }
  }



  async findallassigncard() {
    return await this.assignjobcardmodal.find()
  }

  async createmyjobcard(createmyjobcardDto: createmyjobcardDto) {
    return await this.myjobcardmodal.create(createmyjobcardDto)
  }


  async findmyjobcard(id: string) {
    try {
      return await this.myjobcardmodal.findOne({ _id: id })

    } catch {
      throw new NotFoundException("run time exception")
    }

  }
}
