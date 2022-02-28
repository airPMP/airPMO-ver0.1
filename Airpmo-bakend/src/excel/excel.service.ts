import { Injectable, NotFoundException, Req, UnprocessableEntityException } from '@nestjs/common';
import * as xlsx from 'xlsx';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { excelDocument, excels } from 'src/schemas/excel.schema';

@Injectable()
export class ExcelService {
  constructor(@InjectModel(excels.name) private excelModel: Model<excelDocument>) { }
  async productiveFile(files: any, @Req() req) {
    const projectid = req.body.projectid
    try {
      var workBook: xlsx.WorkBook = await xlsx.read(files[0].buffer, {
        type: 'buffer',
        cellDates: true,
        cellNF: false,
      });
    } catch {
      throw new NotFoundException("!sheet  not found")
    }
    var arr = workBook.SheetNames
    for (let i = 0; i < arr.length; i++) {
      var element = arr[i];
      if (element == "productive_sheet")
        var sheet: xlsx.WorkSheet = await workBook.Sheets[element];
    }
    if (sheet) {
      var jsonData = await xlsx.utils.sheet_to_json(sheet, { dateNF: 'YYYY-MM-DD', })
    }
    else {
      throw new NotFoundException("sheet  not found")
    }
    var user = await this.excelModel.findOne({ project_id: projectid })
    if (!user) {
      if (files[0].fieldname === "productivity" && projectid) {
        var pr = await this.excelModel.create({ productivitysheet: jsonData, project_id: projectid })
        return "upload sucessfully"
      }
      else {
        throw new UnprocessableEntityException("file not match")
      }
    }
    
    else {
      if (files[0].fieldname === "productivity"&&projectid) {
        var pro = await this.excelModel.updateOne({ "project_id": projectid }, { productivitysheet: jsonData })
        return "upload sucessfully"
      }
      else {
        throw new UnprocessableEntityException("file not match")
      }
    }

  }

  async findOne(projectid: string) {
    try {
      var user = await this.excelModel.findOne({ project_id: projectid })
      if (!user) {
        throw new NotFoundException("sheet not found")
      }
      else {
        return user
      }
    } catch {
      throw new NotFoundException("sheet  not found")
    }
  }

  async updateProductiveFile(files: any, @Req() req) {
    var project_id = req.body.projectid
    var name = req.body.name
    try {
      var workBook: xlsx.WorkBook = await xlsx.read(files[0].buffer, {
        type: 'buffer',
        cellDates: true,
        cellNF: false,
      });
    } catch {
      throw new NotFoundException("sheet  not found")
    }
    var arr = workBook.SheetNames
    for (let i = 0; i < arr.length; i++) {
      var element = arr[i];
      if (element == "productive_sheet")
        var sheet: xlsx.WorkSheet = await workBook.Sheets[element];
    }
    if (sheet) {
      var jsonData = await xlsx.utils.sheet_to_json(sheet, { dateNF: 'YYYY-MM-DD', })
    }
    else {
      throw new NotFoundException("sheet  not found")
    }
    var user = await this.excelModel.findOne({ project_id: project_id })
    
    if (user) {
      if (project_id && name === "patch") {
        if (files[0].fieldname === "productivity" && project_id) {
          var pr = await this.excelModel.updateOne({ "project_id": project_id }, { productivitysheet: jsonData })
          return "update sucessfully"
        }
        else {
          throw new UnprocessableEntityException("file name should be correct")
        }
      }

      else if (project_id && name === "delete") {
        if (files[0].fieldname === "productivity" && project_id) {
          var del = await this.excelModel.deleteOne({ "project_id": project_id })
          return "delete sucessfull"
        }
        else {
          throw new UnprocessableEntityException("file name should be correct")
        }
      }
      else {
        throw new UnprocessableEntityException("plz enter vaild data")
      }

    }
    else {
      throw new UnprocessableEntityException("!opps data not found")
    }

  }
}