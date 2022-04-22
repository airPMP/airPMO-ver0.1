import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { spicpi, spicpiDocument } from 'src/schemas/spi_cpi.schema';
import { CreateSpiCpiDto } from './dto/create-spi-cpi.dto';
import { UpdateSpiCpiDto } from './dto/update-spi-cpi.dto';

@Injectable()
export class SpiCpiService {
  constructor(
    @InjectModel(spicpi.name)
    private spicpiModel: SoftDeleteModel<spicpiDocument>,
  ) {}
  async create(createSpiCpiDto: CreateSpiCpiDto) {
    let min_hour = parseInt(createSpiCpiDto.min_hour);
    var unit =
      createSpiCpiDto.productivity[0][' UNIT '] ||
      createSpiCpiDto.productivity[0]['UNIT'];
    if (unit === undefined || unit === null) {
      unit = 'absents';
    }
    const productivity_key = Object.keys(createSpiCpiDto.productivity[0]).slice(
      4,
    );
    var productivity_value = Object.values(
      createSpiCpiDto.productivity[0],
    ).slice(4);
    const arr1 = productivity_value.map(Number);

    const arr = [];
    const cal_arr = [];
    for (let index = 0; index < productivity_key.length; index++) {
      if (productivity_key[index].startsWith(' Part ') === false) {
        arr.push(productivity_key[index]);
      }
    }
    for (let i = 0; i < arr.length; i++) {
      const calculate_hour = (arr1[i] * min_hour).toFixed(2);
      cal_arr.push(calculate_hour);
    }

    var new_arr = {};
    for (let i = 0; i < arr.length; i++) {
      new_arr[arr[i]] = [arr[i], productivity_value[i], cal_arr[i], unit];
    }
    createSpiCpiDto.quantity_to_be_achived =
      createSpiCpiDto.productivity[0][' GANG PRODUCTIVIVY (APRVD. BY PM) '] ||
      createSpiCpiDto.productivity[0]['GANG PRODUCTIVIVY (APRVD. BY PM)'];

    createSpiCpiDto.gang_productivity =
      createSpiCpiDto.productivity[0][' GANG PRODUCTIVIVY (APRVD. BY PM) '] ||
      createSpiCpiDto.productivity[0]['GANG PRODUCTIVIVY (APRVD. BY PM)'];
    createSpiCpiDto.productivity = [new_arr];
    const find_activity_data = await this.spicpiModel.findOne({ activity_code:createSpiCpiDto.activity_code });
   if(find_activity_data===null){
    return await this.spicpiModel.create(createSpiCpiDto);
   }else{
     throw new NotFoundException('data all ready exist this activiy code')
   }
    
  }

  async getjobcardcal(id: string) {
    const finddata = await this.spicpiModel.findOne({ activity_code: id });
    try {
      if (finddata != null) {
        return finddata;
      } else {
        throw new NotFoundException('data not found ');
      }
    } catch {}
  }

  async update(
    id: string,
    activity_code: string,
    updateSpiCpiDto: UpdateSpiCpiDto,
  ) {
    var gangproductivity;
    if(updateSpiCpiDto.gang_productivity!=''){
     gangproductivity =updateSpiCpiDto.gang_productivity
    
    }else{
      gangproductivity='0'
    }

    const quantity_to_be_achieved = updateSpiCpiDto.quantity_to_be_achived;
    let min_hour = parseInt(updateSpiCpiDto.min_hour);
    const productivity_key = Object.keys(updateSpiCpiDto.productivity[0]).slice(4);
    var unit = updateSpiCpiDto.productivity[0][' UNIT '] ||updateSpiCpiDto.productivity[0]['UNIT'];
    if (unit === undefined || unit === null) {
      unit = 'absents';
    }
    var productivity_value = Object.values(updateSpiCpiDto.productivity[0]).slice(4);
    const arr1 = productivity_value.map(Number);

    const arr = [];
    const cal_arr = [];
    for (let index = 0; index < productivity_key.length; index++) {
      if (productivity_key[index].startsWith(' Part') === false) {
        arr.push(productivity_key[index]);
      }
    }

    for (let i = 0; i < arr.length; i++) {
   
      if(quantity_to_be_achieved!='0'&&quantity_to_be_achieved!=""){
      const calculate_hour = arr1[i] * min_hour;
      const cal_ar = calculate_hour.toFixed(2);
      const initial_val = +cal_ar / parseFloat(quantity_to_be_achieved);
      const calculation = (initial_val * parseFloat(gangproductivity)).toFixed(1);
      const calulate = calculation.split('.');
      const cal_minute = parseInt(calulate[1]);
      const a = cal_minute.toFixed();
      const minute_2 = +a * 6;
      const data = calulate[0];
      const hour_minute = `${data}.${minute_2}`;
      cal_arr.push(hour_minute);
      }else{
        cal_arr.push(0);
      }
    }

    var new_arr = {};
    for (let i = 0; i < arr.length; i++) {
      if(quantity_to_be_achieved!='0'&&quantity_to_be_achieved!=""){
      const number = arr1[i] / parseFloat(quantity_to_be_achieved);
      const ar = (number * parseFloat(gangproductivity)).toFixed(2);
       new_arr[arr[i]] = [arr[i], ar, cal_arr[i], unit];
    
    } else{
      new_arr[arr[i]] = [arr[i], 0, cal_arr[i], unit];
    }
  }
    updateSpiCpiDto.productivity[0] = new_arr;
    updateSpiCpiDto.gang_productivity = gangproductivity;
    const finddata = await this.spicpiModel.findOne({
      project_id: id,
      activity_code: activity_code,
    });
    if (finddata != null) {
       if(updateSpiCpiDto.deleted_filed===true){
      const a = await this.spicpiModel.updateOne(
        { activity_code: activity_code },
        { ...updateSpiCpiDto },
      )
      if(a.matchedCount!=0){
        return await this.spicpiModel.findOne({ activity_code: activity_code,project_id:id});
      }
    }
      else{
          const temp_data=updateSpiCpiDto
          return temp_data
      }
     
    } else {
      throw new NotFoundException('sorry no data matched');
    }
  }
  async remove(id: string) {
    const remove = await this.spicpiModel.softDelete({ _id: id });
    if (remove.deleted === 1) {
      return {
        massage: 'delete sucessfully',
      };
    } else {
      throw new NotFoundException(' data not found ');
    }
  }
}
