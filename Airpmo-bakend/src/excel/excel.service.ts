import { Injectable, NotFoundException, Req } from '@nestjs/common';
import { CreateExcelDto } from './dto/create-excel.dto';
import { UpdateExcelDto } from './dto/update-excel.dto';
import * as xlsx from 'xlsx';
import { AnyArray, Model } from 'mongoose';
import { excels, excelDocument } from 'src/schemas/excel.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Console } from 'console';
@Injectable()
export class ExcelService {
  constructor(@InjectModel(excels.name) private excelModel: Model<excelDocument>) { }
  async processFile(files: Express.Multer.File) {

    const workBook: xlsx.WorkBook = await xlsx.read(files.buffer, {
      type: 'buffer',
      cellDates: true,
      cellNF: false,
    });

    const sheetName = workBook?.SheetNames[0];
    const sheet: xlsx.WorkSheet = workBook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(sheet, { dateNF: 'YYYY-MM-DD', });
    console.log(jsonData[0])
    return await this.excelModel.create(jsonData[0])
  //   var element = []
  //   for (let index = 0; index < jsonData.length; index++) {

  //   return  await this.excelModel.create(element[index] = jsonData[index]);
  //   }
  }



  async findAll() {
    return await this.excelModel.find()
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} excel`;
  // }

  // update(id: number, updateExcelDto: UpdateExcelDto) {
  //   return `This action updates a #${id} excel`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} excel`;
  // }
}
