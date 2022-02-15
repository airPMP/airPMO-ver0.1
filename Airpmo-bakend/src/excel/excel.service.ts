import { Injectable, NotFoundException, Req, UnprocessableEntityException } from '@nestjs/common';
import * as xlsx from 'xlsx';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { excelDocument, excels } from 'src/schemas/excel.schema';
import { count } from 'console';
import { IS_OBJECT } from 'class-validator';

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
      throw new NotFoundException("file not found")
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
      throw new NotFoundException("file not found")
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
      if (files[0].fieldname === "productivity" && projectid) {
        var pro = await this.excelModel.updateOne({ "project_id": projectid }, { productivitysheet: jsonData })
        return "upload sucessfully"
      }
      else {
        throw new UnprocessableEntityException("file not match")
      }
    }

  }




  async quantityFile(files, req) {

    const projectid = req.body.projectid
    try {
      var workBook: xlsx.WorkBook = await xlsx.read(files[0].buffer, {
        type: 'buffer',
        cellDates: true,
        cellNF: false,
      });
    } catch {
      throw new NotFoundException("file not found")
    }
    var arr = workBook.SheetNames
    for (let i = 0; i < arr.length; i++) {
      var element = arr[i];
      if (element == "quantity_sheet")
        var sheet: xlsx.WorkSheet = await workBook.Sheets[element];
    }
    if (sheet) {
      var qunatityjsondata = await xlsx.utils.sheet_to_json(sheet, { dateNF: 'YYYY-MM-DD', })
      // return qunatityjsondata
    }
    else {
      throw new NotFoundException("file not found")
    }
   var arrtwokey =[]
   var arraytwovalue =[]
   for (let i = 0; i < qunatityjsondata.length; i++) {
     if(i===0){
    var arrzerokey = Object.keys(qunatityjsondata[i])
    var arrzerovalue = Object.values(qunatityjsondata[i])
     }
     else if(i===1){
      var arronekey = Object.keys(qunatityjsondata[i])
      var arrayonevalue = Object.values(qunatityjsondata[i])
    }
    else{
      arrtwokey[i] = Object.keys(qunatityjsondata[i])
      arraytwovalue[i] = Object.values(qunatityjsondata[i])
    }
   }
    var obj = {}
    for (let i = 0; i < arronekey.length; i++) {
      for (let j = 0; j < arrtwokey.length; j++) {
        if (arronekey[i] === arrtwokey[j]) {
          obj[arraytwovalue[j]] = arrayonevalue[i];
        }
      }
    }
   


  //       var arr2  = {}
  //       for (let i = 0; i < arr.length; i++) {
  //         for (let j = 0; j < arr1.length; j++) {
  //           if (arr[i] === arr1[j]) {
  //             arr2[arrv[i]]=arrayonevalue[j]
  //           }
  //         }
  //       }
  //     console.log(arr2)
  }


}
