import {Injectable, NotFoundException, Req, UnprocessableEntityException } from '@nestjs/common';
import * as xlsx from 'xlsx';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { excelDocument, excels } from 'src/schemas/excel.schema';
var lodash = require('lodash');

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
    var user = await this.excelModel.findOne({ project_id: projectid },)
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
        return "update sucessfully"
      }
      else {
        throw new UnprocessableEntityException("file not match")
      }
    }

  }


  //FIND ALL DATA BY PROJECT ID API*



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



  //QUANTITY...................SHEET



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
      // if (element == "quantity_sheet")
      var sheet: xlsx.WorkSheet = await workBook.Sheets[element];
    }
    if (sheet) {
      var qunatityjsondata = await xlsx.utils.sheet_to_json(sheet, { dateNF: 'YYYY-MM-DD', })
    }
    else {
      throw new NotFoundException("file not found")
    }
    var arrzerokey = Object.keys(qunatityjsondata[0])
    var arronekey = Object.keys(qunatityjsondata[1])
    var arrayonevalue = Object.values(qunatityjsondata[1])

    var count = 0;
    var tier = [];
    var all_tier_info = []
    for (let j = 0; j <= arronekey.length; j++) {
      if (j <= 2) {
        tier[arronekey[j]] = arrayonevalue[j]
      }
      else if (arrzerokey[count] === arronekey[j]) {
        if (arrzerokey[count] === arronekey[j]) {
          all_tier_info.push(tier)
          tier = []
        }
        tier[arronekey[j]] = arrayonevalue[j]
        count++;
      }
      else {
        tier[arronekey[j]] = arrayonevalue[j]
      }

    }
    var obj3 = []
    var final_array = {}
    var sub_sub_zone_value = []
    for (let h = 3; h < qunatityjsondata.length; h++) {
      var arrtwokey = Object.keys(qunatityjsondata[h])
      var arraytwovalue = Object.values(qunatityjsondata[h])

      for (let index = 0; index < all_tier_info.length; index++) {
        var sub_sub_zone_key = Object.keys(all_tier_info[index])
        sub_sub_zone_value = Object.values(all_tier_info[index])

        for (let i = 0; i < sub_sub_zone_key.length; i++) {

          for (let j = 0; j < arrtwokey.length; j++) {

            if (sub_sub_zone_key[i] === arrtwokey[j]) {

              if (Object.keys(final_array).length != 0) {
                obj3.push(final_array)
                final_array = {}
              }
              final_array[sub_sub_zone_value[i]] = arraytwovalue[j]
              let zone_subzone = sub_sub_zone_key[i]
              final_array = Object.assign(final_array, { zone_subzone })

              if (arrtwokey.length - 1 == j) {
                obj3.push(final_array)
                final_array = {}
              }

            }
          }
        }
      }
    }

    var new_obj_array = []
    var new_object = []
    for (let index = 0; index < obj3.length; index++) {
      let key = Object.keys(obj3[index])
      if (key[0] === "Activity ID") {
        if (Object.keys(new_object).length != 0) {
          new_obj_array.push(new_object)
          new_object = []
          // new_object.push(obj3[index])
        }
      }
      new_object.push(obj3[index])

      if (obj3.length - 1 == index) {
        new_obj_array.push(new_object)
        new_object = []
        // new_object.push(obj3[index])
      }

    }
    // console.log( new_obj_array)
    let zone_value = Object.values(qunatityjsondata[0]);
    let zone_key = Object.keys(qunatityjsondata[0]);

    for (let p = 0; p < new_obj_array.length; p++) {
      for (let i = 3; i < new_obj_array[p].length; i++) {
        let k;
        for (let j = 0; j < zone_key.length; j++) {
          let a = parseInt(new_obj_array[p][i].zone_subzone.split('_')[3])
          let b = parseInt(zone_key[j].split('_')[3])
          if (zone_key.length != j + 1) {
            let c = parseInt(zone_key[j + 1].split('_')[3])

            if (a >= b && a < c) {
              if (new_obj_array[p][i].zone_subzone != k) {
                k = new_obj_array[p][i].zone_subzone;
                new_obj_array[p][i].zone_subzone = zone_value[j]

              }
            }
          }
          else {
            if (a >= b && (a < (b + 1))) {
              k = new_obj_array[p][i].zone_subzone;
              new_obj_array[p][i].zone_subzone = zone_value[j]
            }
          }

        }
      }
    }
    var new_ar = {}
    var new_ar1 = []
    var new_ar2 = []
    var new_ar3 = []
    var new_values
    var new_key
    var new_key2 = {}
    var total_values = []
    for (let i = 0; i < new_obj_array.length; i++) {
      for (let j = 0; j < Object.keys(new_obj_array[i]).length; j++) {
        new_values = Object.values(new_obj_array[i][j])
        new_key = Object.keys(new_obj_array[i][j])

        for (let k = 1; k < new_values.length; k++) {
         
          if (j <= 2) {
            var obj = {}
            var activity = new_values[0]
            if (j == 0) {
              obj = Object.assign({ activity_code: activity })
            }
            else if (j == 1) {
              obj = Object.assign({ acitivity_description: activity })
            }
            else {
              obj = Object.assign({ part_no: activity })
            }
            new_ar1[j] = obj
          }

          else if (j >= 3) {
          
            if (new_obj_array[0][3].zone_subzone === new_values[k]) {
              new_ar['zones'] = new_values[k]
              new_ar[new_key[0]] = new_values[0]
            }
            else if (new_obj_array[0][3].zone_subzone != new_values[k]) {
              new_obj_array[0][3].zone_subzone = new_values[k]

              if (Object.keys(new_ar).length != 0) {
                var new_data=Object.values( new_ar)
                new_data.shift();
                var total = lodash.sum(new_data)
                new_ar['sub_zones_total'] = total
                new_ar1.push(new_ar,)
                new_ar = {}
                count=0
              }

              if (new_obj_array[0][3].zone_subzone === new_values[k]) {
                new_ar['zones'] = new_values[k]
                new_ar[new_key[0]] = new_values[0]
              
              }
            }
            if (Object.keys(new_obj_array[i]).length - 1 === j) {
              if (Object.keys(new_ar).length != 0) {
                var new_data=Object.values( new_ar)
                new_data.shift();
                var total = lodash.sum(new_data)
                new_ar['sub_zones_total'] = total
                new_ar1.push(new_ar)
                new_ar = {}
              }

            }

            total_values.push(new_values[0])
            if (Object.keys(new_obj_array[i]).length - 1 === j) {
              new_ar3.push(total_values)
              total_values = []

            }

          }
          if (Object.keys(new_obj_array[i]).length - 1 === j) {
            for (let index = 0; index < new_ar3.length; index++) {
              const element = new_ar3[index];
              var total = lodash.sum(element)
              new_key2['total'] = total

            }
            new_ar1.push(new_key2)
            new_key2 = {}
            if (new_ar1.length != 0) {
              new_ar2.push(new_ar1,)
              new_ar1 = []
            }

          }

        }
      }
    }
    var quantity_find_data = await this.excelModel.findOne({ project_id: projectid })
    if (!quantity_find_data) {
      if (files[0].fieldname === "quantity_sheet" && projectid) {
        var create_quantity = await this.excelModel.create({ quantity_sheets: new_ar2, project_id: projectid })
        return "upload sucessfully"
      }
      else {
        throw new UnprocessableEntityException("file not match")
      }
    }
    else {
      if (files[0].fieldname === "quantity_sheet" && projectid) {
        var update_quantity = await this.excelModel.updateOne({ "project_id": projectid }, { quantity_sheets: new_ar2 })
        return "update sucessfully"
      }
      else {
        throw new UnprocessableEntityException("file not match")
      }
    }
  }

  //FIRE QUANTITY API*



  async firequantityFile(files: any, @Req() req) {
    const projectid = req.body.projectid
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
      var sheet: xlsx.WorkSheet = await workBook.Sheets[element];
    }
    if (sheet) {
      var fire_json_Data = await xlsx.utils.sheet_to_json(sheet, { dateNF: 'YYYY-MM-DD', })

    }
    else {
      throw new NotFoundException("sheet  not found")
    }

    var fire_array_zero_key = Object.keys(fire_json_Data[0])
    var fire_array_zero_value = Object.values(fire_json_Data[0])
    var fire_array_one_key = Object.keys(fire_json_Data[1])
    var fire_array_one_value = Object.values(fire_json_Data[1])
    var fire_array = {}
    var fire_all_data = []
    for (let i = 1; i < fire_json_Data.length; i++) {
      var fire_all_array_key = Object.keys(fire_json_Data[i])
      var fire_all_array_value = Object.values(fire_json_Data[i])

      for (let j = 0; j < fire_array_zero_key.length; j++) {
        for (let k = 0; k < fire_all_array_key.length; k++) {
          if (fire_array_one_key[j] === fire_all_array_key[k]) {
            fire_array[fire_array_one_value[j]] = fire_all_array_value[k]
          }
          else if (fire_array_zero_key[j] === fire_all_array_key[k]) {
            fire_array[fire_array_zero_value[j]] = fire_all_array_value[k]
            if (fire_array_zero_key.length - 1 < j + 1) {
              var total_zone_value = lodash.sum(fire_all_array_value.splice(2,))
              fire_array['total'] = total_zone_value
              fire_all_data.push(fire_array)
              fire_array = {}
            }
          }
        }
      }
    }

    var find_fire_data = await this.excelModel.findOne({ project_id: projectid })
    if (!find_fire_data) {
      if (files[0].fieldname === "fire_quantity_sheet" && projectid) {
        var create_fire_quantity = await this.excelModel.create({ fire_quantity_sheets: fire_all_data, project_id: projectid })
        return "upload sucessfully"
      }
      else {
        throw new UnprocessableEntityException("file not match")
      }
    }
    else {
      if (files[0].fieldname === "fire_quantity_sheet" && projectid) {
        var update_fire_quantity = await this.excelModel.updateOne({ "project_id": projectid }, { fire_quantity_sheets: fire_all_data })
        return "update sucessfully"
      }
      else {
        throw new UnprocessableEntityException("file not match")
      }
    }

  }

  //LIGHT QUANTITY API*


  async lightquantityFile(files: any, @Req() req) {
    const projectid = req.body.projectid
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

      var sheet: xlsx.WorkSheet = await workBook.Sheets[element];
    }
    if (sheet) {
      var light_fitting_json_Data = await xlsx.utils.sheet_to_json(sheet, { dateNF: 'YYYY-MM-DD', })

    }
    else {
      throw new NotFoundException("sheet  not found")
    }
    var new_arr = {}
    var new_arr1 = []
    var light_array_zero_key = Object.keys(light_fitting_json_Data[0])
    var light_array_zero_value = Object.values(light_fitting_json_Data[0])
    for (let a = 0; a < light_array_zero_key.length; a++) {
      var h = light_array_zero_key[a].split("_")
      var zone_sub = h.filter(e => e);

      for (let b = 0; b < zone_sub.length; b++) {
        if ('EMPTY' != zone_sub[b]) {
          if (zone_sub.length === 1) {
            new_arr = Object.assign(new_arr, { zone: "" })
            new_arr1.push(new_arr)
            new_arr = {}
          }
          else if (light_array_zero_key.length - 1 === a) {
            new_arr = Object.assign(new_arr, { zone: "" })
            new_arr1.push(new_arr)
            new_arr = {}
          }
          new_arr[light_array_zero_key[a]] = light_array_zero_value[a]
        }

        else if ('EMPTY' === zone_sub[0]) {
          new_arr[light_array_zero_key[a]] = light_array_zero_value[a]

        }
      }
    }
    // console.log( new_arr1)
    var lights_zone = Object.keys(new_arr1)
    var lights_zone_values = Object.values(new_arr1)
    for (let j = 0; j < lights_zone.length; j++) {
      var lights_zone1 = Object.keys(lights_zone_values[j])
      lights_zone_values[j].zone = lights_zone1[0]
    }

    var light_fitting_objects = {}
    var light_fitting_arrays = []
    var light_fitting_arrays1 = {}
    var light_fitting_all_data = []
    var zone_values
    var total = []
    for (let l = 1; l < light_fitting_json_Data.length; l++) {
      var light_array_all_key = Object.keys(light_fitting_json_Data[l])
      var light_array_all_value = Object.values(light_fitting_json_Data[l])

      for (let index = 1; index < lights_zone_values.length; index++) {
        var zone_keys = Object.keys(lights_zone_values[index])
        zone_values = Object.values(lights_zone_values[index])
        for (let j = 0; j < zone_keys.length; j++) {
          for (let k = 0; k < light_array_all_key.length; k++) {
            if (k < 2) {
              let new_obj = {}
              const values = light_array_all_value[k]
              if (k == 0) {
                new_obj = Object.assign({ activity_code: values })
              }
              else {
                new_obj = Object.assign({ activity_discription: values })
              }

              light_fitting_arrays[k] = new_obj

            }
            else if (zone_keys[j] === light_array_all_key[k]) {
              light_fitting_objects[zone_values[j]] = light_array_all_value[k]
            }
            else if (zone_keys.length - 1 === j) {
              if (Object.keys(light_fitting_objects).length != 0) {
                var sum1 = lodash.sum(Object.values(light_fitting_objects))
                light_fitting_objects['sub_zone_total'] = sum1
                light_fitting_objects['zone'] = zone_values[j]

                light_fitting_arrays.push(light_fitting_objects,)
                light_fitting_objects = {}
              }
              if (lights_zone_values.length - 1 === index) {
                if (light_fitting_arrays.length != 0) {
                  let total_zone_value = {}
                  total_zone_value = lodash.sum(light_array_all_value.splice(2,))
                  light_fitting_arrays[k] = Object.assign({ total: total_zone_value })
                  // light_fitting_arrays['total_value_zone'] = total_zone_value
                  light_fitting_all_data.push(light_fitting_arrays)
                  light_fitting_arrays = []
                }
              }
            }
          }
        }
      }
    }

    var find_light_data = await this.excelModel.findOne({ project_id: projectid })
    if (!find_light_data) {
      if (files[0].fieldname === "light_quantity_sheet" && projectid) {
        var create_light_quantity = await this.excelModel.create({ light_fitting_quantity_sheets: light_fitting_all_data, project_id: projectid })
        return "upload sucessfully"
      }
      else {
        throw new UnprocessableEntityException("file not match")
      }
    }
    else {
      if (files[0].fieldname === "light_quantity_sheet" && projectid) {
        var update_light_quantity = await this.excelModel.updateOne({ "project_id": projectid }, { light_fitting_quantity_sheets: light_fitting_all_data })
        return "update sucessfully"
      }
      else {
        throw new UnprocessableEntityException("file not match")
      }
    }

  }







}

