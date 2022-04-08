import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { excelDocument, excels } from 'src/schemas/excel.schema';
import { project } from 'src/schemas/projects.schema';
import { spicpi, spicpiDocument } from 'src/schemas/spi_cpi.schema';
import { CreateSpiCpiDto } from './dto/create-spi-cpi.dto';
import { UpdateSpiCpiDto } from './dto/update-spi-cpi.dto';

@Injectable()
export class SpiCpiService {
  constructor(
    @InjectModel(spicpi.name) private spicpiModel: Model<spicpiDocument>,
  ) {}
  async create(createSpiCpiDto: CreateSpiCpiDto) {
    let min_hour = parseInt(createSpiCpiDto.min_hour);
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
      if (productivity_key[index].startsWith('Part') === false) {
        arr.push(productivity_key[index]);
      }
    }
    for (let i = 0; i < arr.length; i++) {
      const calculate_hour = arr1[i] * min_hour;
      cal_arr.push(calculate_hour);
    }
    var new_arr = {};
    for (let i = 0; i < arr.length; i++) {
      new_arr[arr[i]] = [arr[i], productivity_value[i], cal_arr[i]];
    }
    createSpiCpiDto.productivity = [new_arr];
    console.log(createSpiCpiDto.productivity);
    return await this.spicpiModel.create(createSpiCpiDto);
  }

  async update(id: string, updateSpiCpiDto: UpdateSpiCpiDto) {
    const finddata = await this.spicpiModel.findOne({
      project_id: updateSpiCpiDto.project_id,
    });
    console.log(finddata);
  }
}
