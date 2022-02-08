import { Injectable, Req} from '@nestjs/common';
import { CreateExcelDto } from './dto/create-excel.dto';
import * as xlsx from 'xlsx';
import { Model } from 'mongoose';
import { excels, excelDocument } from 'src/schemas/excel.schema';
import { InjectModel } from '@nestjs/mongoose';
@Injectable()
export class ExcelService {
  constructor(@InjectModel(excels.name) private excelModel: Model<excelDocument>) { }
  async processFile(files: any,@Req() req) {
   const projectid = req.body.projectid
  //  fieldname: 'Productivity sheet 2.xlsx',
  //   originalname: 'Productivity sheet.xlsx',
  //  console.log(files)
    const workBook: xlsx.WorkBook = await xlsx.read(files[0].buffer, {
      type: 'buffer',
      cellDates: true,
      cellNF: false,
    });
    const sheetName = await workBook?.SheetNames[5];
    const sheet:xlsx.WorkSheet = await workBook.Sheets[sheetName];
    const jsonData = await xlsx.utils.sheet_to_json(sheet, { dateNF: 'YYYY-MM-DD', });
    const user = await this.excelModel.findOne({project_id:projectid})
     if(!user){
      if(files[0].fieldname==="productivity"){
        return await this.excelModel.create({productivitysheet:jsonData,project_id:projectid})
        }
        else if(files[0].fieldname==="quantity"){
          return await this.excelModel.create({quantity_sheets:jsonData,project_id:projectid})
        }
   
     }
     else{
    
        if(files[0].fieldname==="productivity"){
          
        return await this.excelModel.create({productivitysheet:jsonData}) 
        }
        else if(files[0].fieldname==="quantity"){
          return await this.excelModel.create({productivitysheet:jsonData}) 
        }
     }
  }














  // async findAll() {
  //   return await this.excelModel.find()
  //  }

  // async findOne(id: string) {
  //   return await this.excelModel.findOne({ "id": id })
  // }

  // //  async update(id: string,@Req() req) {
  // //   //  const user = await this.excelModel.findOne({"id":id})
  // //   return await this.excelModel.updateOne({"id":id},{...req})
  // //   }
  // async remove(id: string) {
  //   return await this.excelModel.deleteOne({ "id": id })
  // }
}
