import {
  Body,
  Injectable,
  NotFoundException,
  Param,
  Post,
  Req,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, set } from 'mongoose';
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
import { assign } from 'nodemailer/lib/shared';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { spicpi, spicpiDocument } from 'src/schemas/spi_cpi.schema';
import { MyJobCardEmployeeService } from 'src/my-job-card-employee/my-job-card-employee.service';
import {
  myjobcardemployee,
  myjobcardemployeeDocument,
} from 'src/schemas/my-job-card-employee.schema';
import {
  equipment,
  myjobcardequipmentDocument,
} from 'src/schemas/my-job-card-equipment.schema';

@Injectable()
export class JobCardsService {
  constructor(
    @InjectModel(jobcard.name)
    private jobcardmodal: SoftDeleteModel<jobcardDocuments>,
    @InjectModel(jobcardassign.name)
    private assignjobcardmodal: Model<jobcardassignDocuments>,
    @InjectModel(myjobcard.name)
    private myjobcardmodal: Model<myjobcardDocument>,
    @InjectModel(spicpi.name)
    private spicpiModel: SoftDeleteModel<spicpiDocument>,
    @InjectModel(UserRole.name) private UserRoleModel: Model<UserRoleDocument>,
    @InjectModel(Role.name) private RoleModel: Model<RoleDocument>,
    @InjectModel(myjobcardemployee.name)
    private myjobcardemployeemodal: Model<myjobcardemployeeDocument>,
    @InjectModel(equipment.name)
    private myjobcardequipmentmodal: Model<myjobcardequipmentDocument>,
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
      if (
        find_Card.organization_id === organizationkey ||
        airmpo_designation === 'Airpmo Super Admin'
      ) {
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
        if (
          find_all_job_card[index].organization_id === organizationkey ||
          airmpo_designation === 'Airpmo Super Admin'
        ) {
          new_arr.push(find_all_job_card[index]);
        }
      }
      return new_arr;
    } catch {
      throw new NotFoundException('Not found data');
    }
  }

  async jobcardbyprojectid(id: string, @Req() req) {
    const new_arr = [];
    const payload = req.headers.authorization.split('.')[1];
    const encodetoken = Base64.decode(payload);
    var obj = JSON.parse(encodetoken);
    var organizationkey = obj.organization_id;
    var airmpo_designation = obj.roles[0];
    if (organizationkey === undefined || organizationkey === null) {
      throw new UnprocessableEntityException('organization not found');
    }
    const job_card_By_project_id = await this.jobcardmodal.find({
      project_id: id,
    });
    for (let index = 0; index < job_card_By_project_id.length; index++) {
      if (
        job_card_By_project_id[index].organization_id === organizationkey ||
        airmpo_designation === 'Airpmo Super Admin'
      ) {
        new_arr.push(job_card_By_project_id[index]);
      }
    }
    return new_arr;
  }

  async deleteJobcard(@Param('id') id: string) {
    try {
      const check_card = await this.jobcardmodal.findOne({ _id: id });

      const find_emp = await this.myjobcardemployeemodal.find({ jc_id: id });
      if (find_emp.length != 0) {
        for (let index = 0; index < find_emp.length; index++) {
          const jc_id = find_emp[index].jc_id;
          const deleted = await this.myjobcardemployeemodal.deleteOne({
            jc_id: jc_id,
          });
        }
      }

      const find_equipment = await this.myjobcardequipmentmodal.find({
        jc_id: id,
      });
      if (find_equipment.length != 0) {
        for (let i = 0; i < find_equipment.length; i++) {
          const jc_id = find_equipment[i].jc_id;
          const deleted = await this.myjobcardequipmentmodal.deleteOne({
            jc_id: jc_id,
          });
        }
      }

      if (check_card) {
        const delete_card = await this.jobcardmodal.softDelete({ _id: id });
        return 'delete sucessfully';
      } else {
        throw new NotFoundException('data not found');
      }
    } catch {
      throw new NotFoundException('Not found data');
    }
  }

  async updatejobcard(@Body() UpdateJobCardDto: UpdateJobCardDto[]) {
    try {
      const find_all_job = await this.jobcardmodal.find();
      for (let index = 0; index < UpdateJobCardDto.length; index++) {
        for (let i = 0; i < find_all_job.length; i++) {
          if (
            find_all_job[i]._id.toString() ===
            UpdateJobCardDto[index].job_card_no
          ) {
            const asss_user_id = UpdateJobCardDto[index].assign_user_id;
            const assign_to = UpdateJobCardDto[index].assign_to;
            const permisssions = UpdateJobCardDto[index].permissions;
            await this.jobcardmodal.updateOne(
              { _id: UpdateJobCardDto[index].job_card_no },
              {
                $set: {
                  assign_user_id: asss_user_id,
                  assign_to: assign_to,
                  permissions: permisssions,
                },
              },
            );
          }
        }
      }
    } catch {
      throw new NotFoundException('Not found data');
    }
  }

  async editjobcardbyid(id: string, project_id: string, UpdateJobCardDto) {
    const find_all_job = await this.jobcardmodal.findOne({
      _id: id,
      project_id: project_id,
    });

    if (find_all_job != null) {
      const update_obj = await this.jobcardmodal.updateOne(
        { _id: id },
        { ...UpdateJobCardDto },
      );
      if (update_obj.modifiedCount != 0) {
        return {
          massage: 'update sucessfully',
        };
      } else {
        throw new NotFoundException('not update properly');
      }
    } else {
      throw new NotFoundException('sorry data not found');
    }
  }

  async getmyjobcardbyuserid(id: string, project_id: string, @Req() req) {
    const new_arr = [];
    const payload = req.headers.authorization.split('.')[1];
    const encodetoken = Base64.decode(payload);
    var obj = JSON.parse(encodetoken);
    var permission = obj.permission;
    var organizationkey = obj.organization_id;
    var airmpo_designation = obj.roles[0];
    if (organizationkey === undefined || organizationkey === null) {
      throw new UnprocessableEntityException('organization not found');
    }
    const get_assign_all_card = await this.jobcardmodal.find({
      project_id: project_id,
    });
    if (get_assign_all_card.length != 0) {
      var new_ass = [];
      for (let index = 0; index < get_assign_all_card.length; index++) {
        if (airmpo_designation === 'Airpmo Super Admin') {
          new_ass.push(get_assign_all_card[index]);
        } else if (
          get_assign_all_card[index].organization_id === organizationkey
        ) {
          if (
            get_assign_all_card[index].assign_user_id === id ||
            get_assign_all_card[index].assign_user_id === null ||
            get_assign_all_card[index].assign_user_id === ''
          ) {
            new_ass.push(get_assign_all_card[index]);
          }
        }
      }
      return new_ass;
    } else {
      throw new NotFoundException('these project id data not found');
    }
  }

  // async editspicpi(id: string, @Body() UpdateJobCardDto: UpdateJobCardDto) {
  //   const machinary_data = UpdateJobCardDto.manpower_and_machinary[0];
  //   const machinary_data_value = Object.values(machinary_data);
  //   const employe_data = UpdateJobCardDto.actual_employees;
  //   const equipmets_data = UpdateJobCardDto.actual_equipments;
  //   var current_quantity = parseFloat(UpdateJobCardDto.quantity_to_be_achieved);
  //   var update_quantity = parseFloat(
  //     UpdateJobCardDto.updated_quantity_to_be_achived,
  //   );
  //   const hourly_sal = parseFloat(UpdateJobCardDto.hourly_salrey).toFixed(2);
  //   const hourly_standard_sal = parseFloat(
  //     UpdateJobCardDto.hourly_standrd_salrey,
  //   ).toFixed(2);

  //   ///actual employee array
  //   var data_arr = [];
  //   for (let i = 0; i < employe_data.length; i++) {
  //     data_arr.push(employe_data[i]);
  //   }
  //   for (let i = 0; i < equipmets_data.length; i++) {
  //     data_arr.push(equipmets_data[i]);
  //   }
  //   var employe_data_arr = [];
  //   for (let index = 0; index < data_arr.length; index++) {
  //     if (Object.keys(data_arr[index]).length != 0) {
  //       employe_data_arr.push(data_arr[index]);
  //     }
  //   }

  //   var machinary_arr = [];
  //   for (let i = 0; i < machinary_data_value.length; i++) {
  //     machinary_arr.push(machinary_data_value[i]);
  //   }
  //   /////array 2
  //   var new_array = [];
  //   var new_array2 = [];
  //   for (let j = 0; j < machinary_arr.length; j++) {
  //     for (let k = 1; k < machinary_arr[j].length - 1; k++) {
  //       const a = machinary_arr[j][k] / current_quantity;
  //       var calculated_all = (a * update_quantity).toFixed(2);
  //        new_array.push(calculated_all);
  //       if (machinary_arr[j].length - 2 === k) {
  //         new_array2.push(new_array);
  //         new_array = [];
  //       }
  //     }
  //   }

  //   //concate array 1 array 2
  //   var alwoable_arr = [];
  //   var dup = [];
  //   var actual_total_hours = 0;
  //   for (let i = 0; i < machinary_arr.length; i++) {
  //     var popped = machinary_arr[i].pop();
  //     var children = machinary_arr[i].concat(new_array2[i]);
  //     alwoable_arr.push(children);
  //   }
  //   //  console.log(alwoable_arr)
  //   for (let index = 0; index < alwoable_arr.length; index++) {
  //     for (let i = 0; i < employe_data_arr.length; i++) {
  //       if (employe_data_arr[i].designation != undefined) {
  //         if (
  //           alwoable_arr[index][0].toLowerCase() ===
  //           employe_data_arr[i].designation.toLowerCase()
  //         ) {
  //           const cal = parseInt(employe_data_arr[i].hour);
  //           actual_total_hours = actual_total_hours + cal;
  //         }
  //       }
  //       if (employe_data_arr.length - 1 === i) {
  //         dup.push(alwoable_arr[index][0]);
  //         const actual_cost = actual_total_hours * parseInt(hourly_sal);
  //         alwoable_arr[index].push(actual_total_hours, actual_cost);
  //         actual_total_hours = 0;
  //       }
  //     }
  //   }
  //   // console.log(alwoable_arr)
  //   const new_arr2 = [];
  //   for (let index = 0; index < alwoable_arr.length; index++) {
  //     new_arr2.push(alwoable_arr[index][0]);
  //   }

  //   var res = [];
  //   res = employe_data_arr?.filter((el) => {
  //     return !new_arr2?.find((element, i) => {
  //       if (el.designation != undefined) {
  //         return element.toLowerCase() === el.designation.toLowerCase();
  //       }
  //     });
  //   });
  //   // console.log(res)
  //   if (res.length != 0) {
  //     var arr1 = [];
  //     var arr2 = [];
  //     var total = 0;
  //     for (let index = 0; index < res.length; index++) {
  //       if (res[index].designation != undefined) {
  //         arr1.push(res[index].designation);
  //       }
  //       var uniqueChars = [...new Set(arr1)];
  //     }

  //     if (uniqueChars.length != 0 || uniqueChars.length != null) {
  //       for (let index = 0; index < uniqueChars.length; index++) {
  //         for (let i = 0; i < res.length; i++) {
  //           if (employe_data_arr[i].designation != undefined) {
  //             if (
  //               uniqueChars[index].toLowerCase() ===
  //               res[i].designation.toLowerCase()
  //             ) {
  //               total = total + parseInt(res[i].hour);
  //               var h = res[i].designation;
  //             }
  //           }
  //           if (res.length - 1 === i) {
  //             const actual_cos = total * parseInt(hourly_sal);
  //             arr2.push([h, total, actual_cos]);
  //             total = 0;
  //           }
  //         }
  //       }
  //     }
  //     // console.log(arr2)
  //     for (let m = 0; m < arr2.length; m++) {
  //       for (let index = 1; index < 5; index++) {
  //         arr2[m].splice(index, 0, '0');
  //       }
  //       alwoable_arr.push(arr2[m]);
  //     }
  //   }
  //   // console.log(alwoable_arr)
  //   for (let index = 0; index < alwoable_arr.length; index++) {
  //     if (employe_data_arr.length === 0) {
  //       alwoable_arr[index].push(0, 0);
  //     }
  //   }

  //   var cpi_array = [];
  //   var cpi_array2 = [];
  //   for (let index = 0; index < alwoable_arr.length; index++) {
  //     for (let j = 0; j < alwoable_arr[index].length; j++) {
  //       var allowable_cost = parseFloat(alwoable_arr[index][4]) * parseFloat(hourly_standard_sal);
  //       var actual_cost1 = alwoable_arr[index][5];
  //       var cpi;
  //       var spi;
  //       if (actual_cost1 === 0) {
  //         cpi = 0;
  //       } else {
  //         cpi = (allowable_cost / actual_cost1).toFixed(2);
  //       }
  //       if (update_quantity === 0) {
  //         spi = 0;
  //       } else {
  //         spi = current_quantity / update_quantity;
  //       }

  //       cpi_array.push(alwoable_arr[index][j]);
  //       if (alwoable_arr[index].length - 1 === j) {
  //         cpi_array.push(spi, cpi);
  //         cpi_array2.push(cpi_array);
  //         cpi_array = [];
  //       }
  //     }
  //   }

  //   var actual_total_cost = 0;
  //   var all_allowable_cost = 0;
  //   // var all_allowable_cost = 0;
  //   for (let i = 0; i < cpi_array2.length; i++) {
  //     actual_total_cost = actual_total_cost + cpi_array2[i][6];
  //     all_allowable_cost =
  //       all_allowable_cost +
  //       parseFloat(cpi_array2[i][4]) * parseFloat(hourly_standard_sal);
  //   }

  //   var tota_overall_cpi = (all_allowable_cost/actual_total_cost ).toFixed(2);
  //   var total_overall_spi = (current_quantity / update_quantity).toFixed(2);

  //   UpdateJobCardDto.total_overall_cpi = tota_overall_cpi;
  //   UpdateJobCardDto.total_overall_spi = total_overall_spi.toString();
  //   UpdateJobCardDto.alanned_vs_allowable_vs_actual = [cpi_array2];
  //   UpdateJobCardDto.hourly_salrey = hourly_sal;
  //   UpdateJobCardDto.hourly_standrd_salrey = hourly_standard_sal;
  //   UpdateJobCardDto.actual_employees = employe_data
  //   UpdateJobCardDto.actual_equipments = equipmets_data
  //   // UpdateJobCardDto.quantity_to_be_achieved = current_quantity.toString(2);
  //   // UpdateJobCardDto.updated_quantity_to_be_achived =update_quantity.toString(2);
  //   UpdateJobCardDto.unit = popped;

  //   const find = await this.jobcardmodal.findOne({ _id: id });
  //   if (find != null) {
  //     const update = await this.jobcardmodal.updateOne({ _id: id },{ ...UpdateJobCardDto });
  //     if (update.modifiedCount != 0) {
  //       return await this.jobcardmodal.findOne({ _id: id });
  //     } else {
  //       return {
  //         massage: 'update sucessfully but stil data is not change',
  //       };
  //     }
  //   } else {
  //     throw new NotFoundException('data not found');
  //   }
  // }

  async editspicpi(id: string, @Body() UpdateJobCardDto: UpdateJobCardDto) {
    const machinary_data = UpdateJobCardDto.manpower_and_machinary[0];
    const machinary_data_value = Object.values(machinary_data);
    const employe_data = UpdateJobCardDto.actual_employees;
    const equipmets_data = UpdateJobCardDto.actual_equipments;
    var update_quantity;
    if (UpdateJobCardDto.updated_quantity_to_be_achived.trim() === '') {
      update_quantity = 0;
    } else {
      update_quantity = parseFloat(
        UpdateJobCardDto.updated_quantity_to_be_achived.trim(),
      );
    }
    var current_quantity;
    if (UpdateJobCardDto.quantity_to_be_achieved.trim() === '') {
      current_quantity = 0;
    } else {
      current_quantity = parseFloat(UpdateJobCardDto.quantity_to_be_achieved);
    }
    // var current_quantity = parseFloat(UpdateJobCardDto.quantity_to_be_achieved);
    const hourly_sal = parseFloat(UpdateJobCardDto.hourly_salrey).toFixed(2);
    const hourly_standard_sal = parseFloat(
      UpdateJobCardDto.hourly_standrd_salrey,
    ).toFixed(2);

    ///actual employee array

    var data_arr = [];
    for (let i = 0; i < employe_data.length; i++) {
      data_arr.push(employe_data[i]);
    }
    for (let i = 0; i < equipmets_data.length; i++) {
      data_arr.push(equipmets_data[i]);
    }
    var employe_data_arr = [];
    for (let index = 0; index < data_arr.length; index++) {
      if (Object.keys(data_arr[index]).length != 0) {
        employe_data_arr.push(data_arr[index]);
      }
    }

    var machinary_arr = [];
    for (let i = 0; i < machinary_data_value.length; i++) {
      machinary_arr.push(machinary_data_value[i]);
    }

    /////array 2
    var new_array = [];
    var new_array2 = [];
    for (let j = 0; j < machinary_arr.length; j++) {
      for (let k = 1; k < machinary_arr[j].length - 1; k++) {
        let a;
        if (current_quantity === 0) {
          a = 0;
        } else {
          a = machinary_arr[j][k] / current_quantity;
        }
        var calculated_all = (a * update_quantity).toFixed(2);
        new_array.push(calculated_all);
        if (machinary_arr[j].length - 2 === k) {
          new_array2.push(new_array);
          new_array = [];
        }
      }
    }

    //concate array 1 array 2
    var alwoable_arr = [];
    var dup = [];
    var actual_total_hours = 0;
    for (let i = 0; i < machinary_arr.length; i++) {
      var popped = machinary_arr[i].pop();
      var children = machinary_arr[i].concat(new_array2[i]);
      alwoable_arr.push(children);
    }

    for (let index = 0; index < alwoable_arr.length; index++) {
      for (let i = 0; i < employe_data_arr.length; i++) {
        if (employe_data_arr[i].designation != undefined) {
          if (
            alwoable_arr[index][0].trim().toLowerCase() ===
            employe_data_arr[i].designation.trim().toLowerCase()
          ) {
            const cal = parseFloat(employe_data_arr[i].hour);
            actual_total_hours = actual_total_hours + cal;
          }
        }
        if (employe_data_arr.length - 1 === i) {
          dup.push(alwoable_arr[index][0]);
          const actual_cost = actual_total_hours * parseFloat(hourly_sal);
          alwoable_arr[index].push(actual_total_hours, actual_cost);
          actual_total_hours = 0;
        }
      }
    }
    // console.log(alwoable_arr)
    const new_arr2 = [];
    for (let index = 0; index < alwoable_arr.length; index++) {
      new_arr2.push(alwoable_arr[index][0]);
    }

    var res = [];
    res = employe_data_arr?.filter((el) => {
      return !new_arr2?.find((element, i) => {
        if (el.designation != undefined) {
          return (
            element.trim().toLowerCase() === el.designation.trim().toLowerCase()
          );
        }
      });
    });

    if (res.length != 0) {
      var arr1 = [];
      var arr2 = [];
      var total = 0;
      for (let index = 0; index < res.length; index++) {
        if (res[index].designation != undefined) {
          arr1.push(res[index].designation);
        }
        var uniqueChars = [...new Set(arr1)];
      }

      if (uniqueChars.length != 0 || uniqueChars.length != null) {
        for (let index = 0; index < uniqueChars.length; index++) {
          for (let i = 0; i < res.length; i++) {
            if (employe_data_arr[i].designation != undefined) {
              if (
                uniqueChars[index].trim().toLowerCase() ===
                res[i].designation.trim().toLowerCase()
              ) {
                total = total + parseFloat(res[i].hour);
                var h = res[i].designation;
              }
            }
            if (res.length - 1 === i) {
              const actual_cos = total * parseFloat(hourly_sal);
              arr2.push([h, total, actual_cos]);
              total = 0;
            }
          }
        }
      }
      // console.log(arr2)
      for (let m = 0; m < arr2.length; m++) {
        for (let index = 1; index < 5; index++) {
          arr2[m].splice(index, 0, '0');
        }
        alwoable_arr.push(arr2[m]);
      }
    }
    // console.log(alwoable_arr)
    for (let index = 0; index < alwoable_arr.length; index++) {
      if (employe_data_arr.length === 0) {
        alwoable_arr[index].push(0, 0);
      }
    }

    var cpi_array = [];
    var cpi_array2 = [];
    for (let index = 0; index < alwoable_arr.length; index++) {
      for (let j = 0; j < alwoable_arr[index].length; j++) {
        var allowable_cost =
          parseFloat(alwoable_arr[index][4]) * parseFloat(hourly_standard_sal);
        var actual_cost1 = alwoable_arr[index][5];
        var cpi;
        var spi;
        if (actual_cost1 === 0) {
          cpi = 0;
        } else {
          cpi = (allowable_cost / actual_cost1).toFixed(2);
        }
        if (current_quantity === 0) {
          spi = 0;
        } else {
          spi = (update_quantity / current_quantity).toFixed(2);
        }

        cpi_array.push(alwoable_arr[index][j]);
        if (alwoable_arr[index].length - 1 === j) {
          cpi_array.push(spi, cpi);
          cpi_array2.push(cpi_array);
          cpi_array = [];
        }
      }
    }

    var actual_total_cost = 0;
    var all_allowable_cost = 0;
    // var all_allowable_cost = 0;
    for (let i = 0; i < cpi_array2.length; i++) {
      actual_total_cost = actual_total_cost + cpi_array2[i][6];

      all_allowable_cost =
        all_allowable_cost +
        parseFloat(cpi_array2[i][4]) * parseFloat(hourly_standard_sal);
    }

    var tota_overall_cpi;
    if (actual_total_cost === 0) {
      tota_overall_cpi = 0;
    } else {
      tota_overall_cpi = (all_allowable_cost / actual_total_cost).toFixed(2);
    }
    var total_overall_spi;
    if (current_quantity === 0) {
      total_overall_spi = 0;
    } else {
      total_overall_spi = (update_quantity / current_quantity).toFixed(2);
    }

    const productivity_value = Object.values(
      UpdateJobCardDto.manpower_and_machinary[0],
    );

    const productivity = [];
    const productivity1 = {};
    for (let index = 0; index < productivity_value.length; index++) {
      productivity.push(productivity_value[index]);
    }
    for (let i = 0; i < productivity.length; i++) {
      productivity[i].push(popped);
    }
    for (let j = 0; j < productivity.length; j++) {
      productivity1[productivity[j][0]] = productivity[j];
    }
    UpdateJobCardDto.manpower_and_machinary[0] = productivity1;
    UpdateJobCardDto.total_overall_cpi = tota_overall_cpi;
    UpdateJobCardDto.total_overall_spi = total_overall_spi.toString();
    UpdateJobCardDto.alanned_vs_allowable_vs_actual = [cpi_array2];
    UpdateJobCardDto.hourly_salrey = hourly_sal;
    UpdateJobCardDto.hourly_standrd_salrey = hourly_standard_sal;
    UpdateJobCardDto.unit = popped;

    const find = await this.jobcardmodal.findOne({ _id: id });
    if (find != null) {
      const update = await this.jobcardmodal.updateOne(
        { _id: id },
        { ...UpdateJobCardDto },
      );
      if (update.modifiedCount != 0) {
        return await this.jobcardmodal.findOne({ _id: id });
      } else {
        return {
          massage: 'update sucessfully but stil data is not change',
        };
      }
    } else {
      throw new NotFoundException('data not found');
    }
  }

  async findjobprojectid(project_id: string) {
    const all_job_card = await this.jobcardmodal.find({
      project_id: project_id,
    });
    if (all_job_card.length != null) {
      return await this.jobcardmodal.find({ project_id: project_id });
    } else {
      return {
        massage: 'check your project id in this project id data not found',
      };
    }
  }

  // async assignjobcard(assignJobCardDto: assignJobCardDto) {
  //   try {
  //     const id = assignJobCardDto.organization_id;
  //     const find_assign = await this.assignjobcardmodal.findOne({
  //       organization_id: id,
  //     });
  //     if (find_assign === null) {
  //       return await this.assignjobcardmodal.create(assignJobCardDto);
  //     } else {
  //       const update_assign_card = await this.assignjobcardmodal.updateOne(
  //         { organization_id: assignJobCardDto.organization_id },
  //         { assign_data: assignJobCardDto.assign_data },
  //       );
  //       return await this.assignjobcardmodal.findOne({ organization_id: id });
  //     }
  //   } catch {
  //     throw new UnprocessableEntityException('all ready exist');
  //   }
  // }

  // async getassignjobcard(id: string, @Req() req) {
  //   try {
  //     const new_arr = [];
  //     const payload = req.headers.authorization.split('.')[1];
  //     const encodetoken = Base64.decode(payload);
  //     var obj = JSON.parse(encodetoken);
  //     var organizationkey = obj.organization_id;
  //     var airmpo_designation = obj.roles[0];
  //     if (organizationkey === undefined || organizationkey === null) {
  //       throw new UnprocessableEntityException('organization not found');
  //     }
  //     const get_job_card = await this.assignjobcardmodal.findOne({ _id: id });
  //     if (
  //       get_job_card.organization_id === organizationkey ||
  //       airmpo_designation === 'Airpmo Super Admin'
  //     ) {
  //       return get_job_card;
  //     } else {
  //       throw new UnprocessableEntityException(
  //         'its not exist in this orgainization',
  //       );
  //     }
  //   } catch {
  //     throw new NotFoundException('data not found');
  //   }
  // }

  // async assignuserdata(id: string, @Req() req) {
  //   try {
  //     var new_arr = [];
  //     var arr1 = [];
  //     var arr = [];
  //     const payload = req.headers.authorization.split('.')[1];
  //     const encodetoken = Base64.decode(payload);
  //     var obj = JSON.parse(encodetoken);
  //     var organizationkey = obj.organization_id;
  //     var airmpo_designation = obj.roles[0];
  //     if (organizationkey === undefined || organizationkey === null) {
  //       throw new UnprocessableEntityException('organization not found');
  //     }
  //     const findalldata = await this.assignjobcardmodal.find();
  //     findalldata?.map((item, id) => {
  //       item?.assign_data?.map((item2, ids) => {
  //         arr1.push(item2);
  //       });
  //     });

  //     for (let index = 0; index < arr1.length; index++) {
  //       if (
  //         arr1[index].organization_id === organizationkey ||
  //         airmpo_designation === 'Airpmo Super Admin'
  //       ) {
  //         arr.push(arr1[index]);
  //       }
  //     }
  //     for (let i = 0; i < arr.length; i++) {
  //       const id = arr[i]._id.toString();

  //       var find = await this.myjobcardmodal.findOne({ jc_number: id }).lean();
  //       if (find != null) {
  //         const new_obj = {
  //           current_quantity_to_be_achieved:
  //             find.current_quantity_to_be_achieved,
  //           cpi: find.cpi,
  //           spi: find.spi,
  //         };
  //         const obj = Object.assign({}, arr[i], new_obj);
  //         new_arr.push(obj);
  //       } else {
  //         new_arr.push(arr[i]);
  //       }
  //     }
  //     const finduser = await this.UserRoleModel.find();
  //     for (let i = 0; i < finduser.length; i++) {
  //       if (finduser[i].user_id === id) {
  //         const findroles = await this.RoleModel.findOne({
  //           _id: finduser[i].role_id,
  //         });
  //         var ab = findroles.permission;
  //         for (let j = 0; j <= ab.length; j++) {
  //           if (ab[j] === 'ALL') {
  //             return new_arr;
  //           } else {
  //             const variableOne = new_arr.filter(
  //               (itemInArray) => itemInArray.assign_user_id === id,
  //             );
  //             return variableOne;
  //           }
  //         }
  //       }
  //     }
  //   } catch {
  //     throw new UnprocessableEntityException('data not found');
  //   }
  // }

  // async findallassigncard(@Req() req) {
  //   try {
  //     const new_arr = [];
  //     const payload = req.headers.authorization.split('.')[1];
  //     const encodetoken = Base64.decode(payload);
  //     var obj = JSON.parse(encodetoken);
  //     var organizationkey = obj.organization_id;
  //     var airmpo_designation = obj.roles[0];
  //     if (organizationkey === undefined || organizationkey === null) {
  //       throw new UnprocessableEntityException('organization not found');
  //     }
  //     const find_all_asign_card = await this.assignjobcardmodal.find();
  //     const arr1 = [];
  //     find_all_asign_card?.map((item, id) => {
  //       item?.assign_data?.map((item2, ids) => {
  //         arr1.push(item2);
  //       });
  //     });
  //     for (let index = 0; index < arr1.length; index++) {
  //       if (
  //         arr1[index].organization_id === organizationkey ||
  //         airmpo_designation === 'Airpmo Super Admin'
  //       ) {
  //         new_arr.push(arr1[index]);
  //       }
  //     }
  //     return new_arr;
  //   } catch {
  //     throw new NotFoundException('data not found');
  //   }
  // }

  // async assignjobcardbyprojectid(id: string, @Req() req) {
  //   try {
  //     const new_arr = [];
  //     const payload = req.headers.authorization.split('.')[1];
  //     const encodetoken = Base64.decode(payload);
  //     var obj = JSON.parse(encodetoken);
  //     var organizationkey = obj.organization_id;
  //     var airmpo_designation = obj.roles[0];
  //     if (organizationkey === undefined || organizationkey === null) {
  //       throw new UnprocessableEntityException('organization not found');
  //     }
  //     const find_assign_jc_by_project_id = await this.assignjobcardmodal.find();
  //     let arr1 = [];
  //     find_assign_jc_by_project_id?.map((item, id) => {
  //       item?.assign_data?.map((item2, ids) => {
  //         arr1.push(item2);
  //       });
  //     });
  //     var find_array = [];
  //     for (let index = 0; index < arr1.length; index++) {
  //       if (
  //         arr1[index].organization_id === organizationkey ||
  //         airmpo_designation === 'Airpmo Super Admin'
  //       ) {
  //         if (arr1[index].project_id === id) {
  //           find_array.push(arr1[index]);
  //         }
  //       }
  //     }
  //     return find_array;
  //   } catch {
  //     throw new NotFoundException('assign job cardrs not exist');
  //   }
  // }

  // async getmyjobcardbyuserid(id: string, project_id: string, @Req() req) {
  //   const new_arr = [];
  //   const payload = req.headers.authorization.split('.')[1];
  //   const encodetoken = Base64.decode(payload);
  //   var obj = JSON.parse(encodetoken);
  //   var organizationkey = obj.organization_id;
  //   var airmpo_designation = obj.roles[0];
  //   if (organizationkey === undefined || organizationkey === null) {
  //     throw new UnprocessableEntityException('organization not found');
  //   }
  //   const get_assign_all_card = await this.assignjobcardmodal.find();
  //   let arr1 = [];
  //   get_assign_all_card?.map((item, id) => {
  //     item?.assign_data?.map((item2, ids) => {
  //       arr1.push(item2);
  //     });
  //   });
  //   var new_ar = [];
  //   for (let i = 0; i < arr1.length; i++) {
  //     if (
  //       arr1[i].organization_id === organizationkey ||
  //       airmpo_designation === 'Airpmo Super Admin'
  //     ) {
  //       if (arr1[i].project_id === project_id) {
  //         new_ar.push(arr1[i]);
  //       }
  //     }
  //   }
  //   if (airmpo_designation === 'Airpmo Super Admin') {
  //     return new_ar;
  //   } else {
  //     var find_assign_user = [];
  //     for (let index = 0; index < new_ar.length; index++) {
  //       if (new_ar[index].assign_user_id === id) {
  //         find_assign_user.push(new_ar[index]);
  //       } else if (new_ar[index].assign_user_id === undefined) {
  //         find_assign_user.push(new_ar[index]);
  //       }
  //     }
  //     return find_assign_user;
  //   }
  // }

  // async createmyjobcard(createmyjobcardDto: createmyjobcardDto) {
  //   return await this.myjobcardmodal.create(createmyjobcardDto);
  // }

  // async findmyjobcard(id: string, @Req() req) {
  //   try {
  //     const payload = req.headers.authorization.split('.')[1];
  //     const encodetoken = Base64.decode(payload);
  //     var obj = JSON.parse(encodetoken);
  //     var organizationkey = obj.organization_id;
  //     var airmpo_designation = obj.roles[0];
  //     if (organizationkey === undefined || organizationkey === null) {
  //       throw new UnprocessableEntityException('organization not found');
  //     }
  //     const find_my_job = await this.myjobcardmodal.findOne({ _id: id });
  //     if (
  //       find_my_job.organization_id === organizationkey ||
  //       airmpo_designation === 'Airpmo Super Admin'
  //     ) {
  //       return find_my_job;
  //     } else {
  //       throw new UnprocessableEntityException(
  //         'its not exist in this orgainization',
  //       );
  //     }
  //   } catch {
  //     throw new NotFoundException('my job card not found');
  //   }
  // }

  // async myjobcard(@Req() req) {
  //   try {
  //     const new_arr = [];
  //     const payload = req.headers.authorization.split('.')[1];
  //     const encodetoken = Base64.decode(payload);
  //     var obj = JSON.parse(encodetoken);
  //     var organizationkey = obj.organization_id;
  //     var airmpo_designation = obj.roles[0];
  //     if (organizationkey === undefined || organizationkey === null) {
  //       throw new UnprocessableEntityException('organization not found');
  //     }
  //     const get_all_my_job_card = await this.myjobcardmodal.find();
  //     for (let index = 0; index < get_all_my_job_card.length; index++) {
  //       if (
  //         get_all_my_job_card[index].organization_id === organizationkey ||
  //         airmpo_designation === 'Airpmo Super Admin'
  //       ) {
  //         new_arr.push(get_all_my_job_card[index]);
  //       }
  //     }
  //     if (new_arr.length != 0) {
  //       return new_arr;
  //     } else {
  //       throw new NotFoundException('my job card not exist');
  //     }
  //   } catch {
  //     throw new NotFoundException('my job card not found ');
  //   }
  // }

  // async myjobcardbyprojectid(id: string, @Req() req) {
  //   try {
  //     const new_arr = [];
  //     const payload = req.headers.authorization.split('.')[1];
  //     const encodetoken = Base64.decode(payload);
  //     var obj = JSON.parse(encodetoken);
  //     var organizationkey = obj.organization_id;
  //     var airmpo_designation = obj.roles[0];
  //     if (organizationkey === undefined || organizationkey === null) {
  //       throw new UnprocessableEntityException('organization not found');
  //     }
  //     const my_job_card_by_project_id = await this.myjobcardmodal.find({
  //       project_id: id,
  //     });
  //     for (let index = 0; index < my_job_card_by_project_id.length; index++) {
  //       if (
  //         my_job_card_by_project_id[index].organization_id ===
  //           organizationkey ||
  //         airmpo_designation === 'Airpmo Super Admin'
  //       ) {
  //         new_arr.push(my_job_card_by_project_id[index]);
  //       }
  //     }
  //     if (new_arr.length != 0) {
  //       return new_arr;
  //     } else {
  //       throw new NotFoundException('my job card not exist');
  //     }
  //   } catch {
  //     throw new NotFoundException('my job card not exist');
  //   }
  // }
}
