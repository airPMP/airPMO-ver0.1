import { Injectable} from '@nestjs/common';
import { CreateExcelDto } from './dto/create-excel.dto';
import * as xlsx from 'xlsx';
import { Model } from 'mongoose';
import { excels, excelDocument } from 'src/schemas/excel.schema';
import { InjectModel } from '@nestjs/mongoose';
@Injectable()
export class ExcelService {
  constructor(@InjectModel(excels.name) private excelModel: Model<excelDocument>) { }
  async processFile(files: Express.Multer.File) {

    const workBook: xlsx.WorkBook = await xlsx.read(files.buffer, {
      type: 'buffer',
      cellDates: true,
      cellNF: false,
    });

    const sheetName = await workBook?.SheetNames[5];
    const sheet: xlsx.WorkSheet = await workBook.Sheets[sheetName];
    const jsonData: CreateExcelDto = await xlsx.utils.sheet_to_json(sheet, { dateNF: 'YYYY-MM-DD', });
    // return jsonData
    return await this.excelModel.create({  productivitysheet: jsonData })
  }



  async findAll() {
    return await this.excelModel.find()
   }

  async findOne(id: string) {
    return await this.excelModel.findOne({ "id": id })
  }

  //  async update(id: string,@Req() req) {
  //   //  const user = await this.excelModel.findOne({"id":id})
  //   return await this.excelModel.updateOne({"id":id},{...req})
  //   }
  async remove(id: string) {
    return await this.excelModel.deleteOne({ "id": id })
  }
}
