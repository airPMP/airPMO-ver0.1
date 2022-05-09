import {
  Injectable,
  NotFoundException,
  Req,
  UnprocessableEntityException,
} from '@nestjs/common';
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
      const equipment_id = createMyJobCardEquipmentDto.equipment_id;
      const date = createMyJobCardEquipmentDto.date;
      const recent_hour = createMyJobCardEquipmentDto.hour;
      const maximum_hour = createMyJobCardEquipmentDto.max_hour;
      const equipment_project_id = createMyJobCardEquipmentDto.project_id;
      const equipment_data = await this.myjobcardequipmentmodal.find({
        equipment_id:equipment_id,
        date: date,
        project_id: equipment_project_id,
      });
      if (equipment_data.length != 0) {
        var equipment_hour = 0;
        for (let index = 0; index < equipment_data.length; index++) {
          equipment_hour = equipment_hour + parseFloat(equipment_data[index].hour);
        }
        const total_equipment_hours = equipment_hour + parseFloat(recent_hour);
        if (total_equipment_hours <= parseFloat(maximum_hour)) {
          var remainig_hours = parseFloat(maximum_hour) - total_equipment_hours;
          if (remainig_hours >= 0) {
            if (createMyJobCardEquipmentDto.create_equipments === true) {
              return await this.myjobcardequipmentmodal.create(
                createMyJobCardEquipmentDto,
              );
            }
          } else {
            return new NotFoundException(`your limit is 0`);
          }
        } else {
          const remaing = parseFloat(maximum_hour) - equipment_hour;
          if (remaing === 0) {
            return new NotFoundException(`your limit is 0`);
          } else {
            if (remaing > 0) {
              return new NotFoundException(`remaing hrs is ${remaing}`);
            } else {
              return new NotFoundException(
                `maximum limit is ${createMyJobCardEquipmentDto.max_hour}`,
              );
            }
          }
        }
      } else {
        if (
          parseFloat(createMyJobCardEquipmentDto.hour) <=
            parseFloat(createMyJobCardEquipmentDto.max_hour) &&
            equipment_data.length === 0
        ) {
          if (createMyJobCardEquipmentDto.create_equipments === true) {
            return await this.myjobcardequipmentmodal.create(
              createMyJobCardEquipmentDto,
            );
          }
        } else {
          return {
            message: `maximum limit is ${createMyJobCardEquipmentDto.max_hour}`,
          };
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
      const all_my_job_card_eqipments =
        await this.myjobcardequipmentmodal.find();
      for (let index = 0; index < all_my_job_card_eqipments.length; index++) {
        if (
          all_my_job_card_eqipments[index].organization_id ===
            organizationkey ||
          airmpo_designation === 'Airpmo Super Admin'
        ) {
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
      if (
        find_one_equipment.organization_id === organizationkey ||
        airmpo_designation === 'Airpmo Super Admin'
      ) {
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
    const find_equip=  await this.myjobcardequipmentmodal.findOne({_id: id,project_id:updateMyJobCardEquipmentDto.project_id})
    if(find_equip!=null){
    const equip_id=find_equip.equipment_id
    const project_id=find_equip.project_id
    const date=find_equip.date
    const old_hrs=parseFloat(find_equip.hour)
    const max_hrs=parseFloat(find_equip.max_hour)
    const updated_hrs=parseFloat(updateMyJobCardEquipmentDto.hour)
    const all_equip=await this.myjobcardequipmentmodal.find({employee_id:equip_id,project_id:project_id,date:date})
  
    if(all_equip.length!=0){
      var equip_hour = 0;
        for (let index = 0; index < all_equip.length; index++) {
          equip_hour = equip_hour + parseFloat(all_equip[index].hour);
        } 
       const equip_total_hrs= equip_hour-old_hrs
       const euip_update_total_hrs=equip_total_hrs+updated_hrs
       if(euip_update_total_hrs<= max_hrs){
         if(updateMyJobCardEquipmentDto.create_equipments===true){
        const upd =await this.myjobcardequipmentmodal.updateOne({ _id: id },{ ...updateMyJobCardEquipmentDto })  
       if(upd.matchedCount!=0) {
       return await this.myjobcardequipmentmodal.findOne({_id: id,project_id:updateMyJobCardEquipmentDto.project_id})
       }
      }
      }else{
      const remaing_hrs= max_hrs-equip_total_hrs
      if(remaing_hrs>=0){
        return{
          message:`remaing hrs is ${remaing_hrs}`
        }
      }else{
        return `maximum hrs is ${max_hrs}`
      }
      }
    }
     
  
  }else{
        return new NotFoundException('data not found')
   }
   
  }

  async remove(id: string) {
    return await this.myjobcardequipmentmodal.remove({ _id: id });
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
      const equipment = await this.myjobcardequipmentmodal.find();
      for (let i = 0; i < equipment.length; i++) {
        if (equipment[i].jc_id === id) {
          if (
            equipment[i].organization_id === organizationkey ||
            airmpo_designation === 'Airpmo Super Admin'
          ) {
            new_arr.push(equipment[i]);
          }
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
