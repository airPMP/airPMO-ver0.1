import { Injectable, Req } from '@nestjs/common';
import * as xlsx from 'xlsx';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { excelDocument, excels } from 'src/schemas/excel.schema';
@Injectable()
export class ExcelService {
  constructor(@InjectModel(excels.name) private excelModel: Model<excelDocument>) { }
  async processFile(files: any, @Req() req) {
    const projectid = req.body.projectid
    const workBook: xlsx.WorkBook = await xlsx.read(files[0].buffer, {
      type: 'buffer',
      cellDates: true,
      cellNF: false,
    });
    if (files[0].fieldname === "productivity") {
      var sheetName = await workBook?.SheetNames[0];
    }
    else {
      var sheetName = await workBook?.SheetNames[0];
    }
    const sheet: xlsx.WorkSheet = await workBook.Sheets[sheetName];
    var jsonData = await xlsx.utils.sheet_to_json(sheet, { dateNF: 'YYYY-MM-DD', });
    // return (jsonData)

    var arr = []
    for (let i = 0; i < 1; i++) {
      arr[i] = jsonData[i];

    }

    var arr1 = []
    for (let i = 1; i < 2; i++) {
      arr1[i] = jsonData[i]
    }

    var arr2 = []
    for (let i = 3; i < jsonData.length; i++) {
      arr2[i] = jsonData[i];

    }

    var zeroindex = []
    for (let index = 3; index < jsonData.length; index++) {
      zeroindex[index] = jsonData[index]
    }
    const a = zeroindex.map((item) => {
      return {
        "Activity": item.__EMPTY,
        [arr1[1].__EMPTY]: item.__EMPTY,
        [arr1[1].__EMPTY_1]: item.__EMPTY_1,
        [arr[0].__EMPTY_2]: {
          "Apartment": item.__EMPTY_2,
          "FOH": item.__EMPTY_3,
          "BOH": item.__EMPTY_4,
        },
        [arr[0].__EMPTY_5]: {
          "Apartment": item.__EMPTY_5,
          "FOH": item.__EMPTY_6,
          "BOH": item.__EMPTY_7,
        },
        [arr[0].__EMPTY_8]: {
          "Apartment": item.__EMPTY_8,
          "FOH": item.__EMPTY_9,
          "BOH": item.__EMPTY_10,
        },

        [arr[0].__EMPTY_11]: {
          "Apartment": item.__EMPTY_11,
          "FOH": item.__EMPTY_12,
          "BOH": item.__EMPTY_13,
        },
        [arr[0].__EMPTY_14]: {
          "Apartment": item.__EMPTY_14,
          "FOH": item.__EMPTY_15,
          "BOH": item.__EMPTY_16,
        },
        [arr[0].__EMPTY_17]: {
          "Apartment": item.__EMPTY_17,
          "FOH": item.__EMPTY_18,
          "BOH": item.__EMPTY_19,
        },
        [arr[0].__EMPTY_20]: {
          "Apartment": item.__EMPTY_20,
          "FOH": item.__EMPTY_21,
          "BOH": item.__EMPTY_22,
        },
        [arr[0].__EMPTY_23]: {
          "Apartment": item.__EMPTY_23,
          "FOH": item.__EMPTY_24,
          "BOH": item.__EMPTY_25,
        },
        [arr[0].__EMPTY_26]: {
          "Apartment": item.__EMPTY_26,
          "FOH": item.__EMPTY_27,
          "BOH": item.__EMPTY_28,
        },
        [arr[0].__EMPTY_29]: {
          "Apartment": item.__EMPTY_29,
          "FOH": item.__EMPTY_30,
          "BOH": item.__EMPTY_31,
        },
        [arr[0].__EMPTY_32]: {
          "Apartment": item.__EMPTY_32,
          "FOH": item.__EMPTY_33,
          "BOH": item.__EMPTY_34,
        },
        [arr[0].__EMPTY_35]: {
          "FOH": item.__EMPTY_35,
          "BOH": item.__EMPTY_36,
        },
        [arr[0].__EMPTY_37]: {
          "FOH": item.__EMPTY_37,
          "BOH": item.__EMPTY_38,
        },
        [arr[0].__EMPTY_39]: {
          "FOH": item.__EMPTY_39,
          "BOH": item.__EMPTY_40,
        },
        [arr[0].__EMPTY_41]: {
          "FOH": item.__EMPTY_41,
          "BOH": item.__EMPTY_42,
        },
        [arr[0].__EMPTY_43]: {
          "FOH": item.__EMPTY_43,
          "BOH": item.__EMPTY_44,
        },
        [arr[0].__EMPTY_45]: {
          "FOH": item.__EMPTY_45,
          "BOH": item.__EMPTY_46,
        },
        [arr[0].__EMPTY_47]: {
          "FOH": item.__EMPTY_47,
          "BOH": item.__EMPTY_48,
        },
        [arr[0].__EMPTY_49]: {
          "BOH": item.__EMPTY_49,
        },
        [arr[0].__EMPTY_50]: {
          "BOH": item.__EMPTY_50,
        },
        [arr[0].__EMPTY_51]: {
          "BOH": item.__EMPTY_51,
        },
        [arr[0].__EMPTY_52]: {
          "BOH": item.__EMPTY_52,
        },
        [arr[0].__EMPTY_53]: {
          "BOH": item.__EMPTY_53,
        },
        [arr[0].__EMPTY_54]: {
          "BOH": item.__EMPTY_54,
        },

        [arr[0].__EMPTY_55]: {
          "BOH": item.__EMPTY_55,
        },
        [arr[0].__EMPTY_56]: {
          "BOH": item.__EMPTY_56,
        },
        [arr[0].__EMPTY_57]: {
          "BOH": item.__EMPTY_57,
        },
        [arr[0].__EMPTY_58]: {
          "BOH": item.__EMPTY_58,
        },
        "Apartment": item.__EMPTY_59,
        "FOH": item.__EMPTY_60,
        "BOH": item.__EMPTY_61,
      }
    })
    return await this.excelModel.create({ quantity_sheets: a })




    // const user = await this.excelModel.findOne({ project_id: projectid })

    // if (!user) {
    //   if (files[0].fieldname === "productivity") {
    //     await this.excelModel.create({ productivitysheet: jsonData, project_id: projectid })
    //   }
    //   else if (files[0].fieldname === "quantity") {
    //     await this.excelModel.create({ quantity_sheets: jsonData, project_id: projectid })
    //   }
    //   else {
    //     return {
    //       "massage": "sorry given a proper key"
    //     }
    //   }

    // }
    // else {
    //   if (files[0].fieldname === "productivity") {
    //     const pro = await this.excelModel.updateOne({ "project_id": projectid }, { productivitysheet: jsonData })
    //   }

    //   else if (files[0].fieldname === "quantity") {
    //     const qun = await this.excelModel.updateOne({ "project_id": projectid }, { quantity_sheets: jsonData })

    //   }
    //   else {
    //     return {
    //       "massage": "plz upload the proper file"
    //     }
    //   }
    // }















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
}