import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { excelDocument, excels } from 'src/schemas/excel.schema';
import { project } from 'src/schemas/projects.schema';
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
    const total_hour = [];
    for (let index = 0; index < productivity_key.length; index++) {
      if (productivity_key[index].startsWith(' Part ') === false) {
        arr.push(productivity_key[index]);
      }
    }
    for (let i = 0; i < arr.length; i++) {
      const calculate_hour = arr1[i] * min_hour;
      cal_arr.push(calculate_hour);
    }

    var new_arr = {};
    for (let i = 0; i < arr.length; i++) {
      new_arr[arr[i]] = [arr[i], unit, productivity_value[i], cal_arr[i]];
    }
    createSpiCpiDto.gang_productivity =
      createSpiCpiDto.productivity[0][' GANG PRODUCTIVIVY (APRVD. BY PM) '] ||
      createSpiCpiDto.productivity[0]['GANG PRODUCTIVIVY (APRVD. BY PM)'];
    createSpiCpiDto.productivity = [new_arr];
    return await this.spicpiModel.create(createSpiCpiDto);
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
    const gangproductivity = updateSpiCpiDto.gang_productivity;
    let min_hour = parseInt(updateSpiCpiDto.min_hour);
    const productivity_key = Object.keys(updateSpiCpiDto.productivity[0]).slice(
      4,
    );
    var unit =
      updateSpiCpiDto.productivity[0][' UNIT '] ||
      updateSpiCpiDto.productivity[0]['UNIT'];
    if (unit === undefined || unit === null) {
      unit = 'absents';
    }
    var productivity_value = Object.values(
      updateSpiCpiDto.productivity[0],
    ).slice(4);
    const arr1 = productivity_value.map(Number);

    const arr = [];
    const cal_arr = [];
    const total_hour = [];
    for (let index = 0; index < productivity_key.length; index++) {
      if (productivity_key[index].startsWith('Part') === false) {
        arr.push(productivity_key[index]);
      }
    }

    for (let i = 0; i < arr.length; i++) {
      const calculate_hour = arr1[i] * min_hour * parseInt(gangproductivity);
      const cal_ar = calculate_hour.toFixed(2);

      const calulate = cal_ar.split('.');
      const data = parseInt(calulate[0]);
      const minute_2 = (parseInt(calulate[1]) / 100) * 60;
      const hour_minute = `${data}.${minute_2}`;
      cal_arr.push(hour_minute);
    }

    var new_arr = {};
    for (let i = 0; i < arr.length; i++) {
      const ar = arr1[i] * parseInt(gangproductivity);
      new_arr[arr[i]] = [arr[i], unit, ar, cal_arr[i]];
    }

    updateSpiCpiDto.productivity[0] = new_arr;
    updateSpiCpiDto.quantity_to_be_achived = gangproductivity;
    const finddata = await this.spicpiModel.findOne({
      project_id: id,
      activity_code: activity_code,
    });
    if (finddata != null) {
      const a = await this.spicpiModel.updateOne(
        { activity_code: activity_code },
        { ...updateSpiCpiDto },
      );
      if (a.modifiedCount != 0) {
        return await this.spicpiModel.findOne({
          project_id: id,
          activity_code: activity_code,
        });
      } else {
        throw new NotFoundException('not found');
      }
    } else {
      throw new NotFoundException('not found');
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
