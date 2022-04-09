import { Injectable, Response } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Console } from 'console';
import { Model } from 'mongoose';
import { hrms, hrmsDocuments } from 'src/schemas/hrms.schema';
import { CreateHrmsApiDto } from './dto/create-hrms-api.dto';
import { UpdateHrmsApiDto } from './dto/update-hrms-api.dto';
var axios = require('axios');

@Injectable()
export class HrmsApiService {
  constructor(
    @InjectModel(hrms.name)
    private hrmsmodal: Model<hrmsDocuments>,
  ) {}

  async findAll(id: string, @Response() res) {
    // console.log(res);
    var config = {
      method: 'get',
      url: `http://abe.fortiddns.com:7993/cosec/api.svc/v2/attendance-daily?action=get;range=section;id=${id}`,
      headers: {
        Authorization: 'Basic YWlycG1vOkFJUlBNTzIwMjI=',
        Cookie: 'ASP.NET_SessionId=imwgbqprs0tkczardwcqydf1',
      },
    };
    var config2 = {
      method: 'get',
      url: `http://abe.fortiddns.com:7993/cosec/api.svc/v2/USER?ACTION=GET;field-name=id,name,designation-name;range=section;id=${id}`,
      headers: {
        Authorization: 'Basic YWlycG1vOkFJUlBNTzIwMjI=',
        Cookie: 'ASP.NET_SessionId=imwgbqprs0tkczardwcqydf1',
      },
    };

    axios(config)
      .then(function (response) {
        axios(config2).then(function (response2) {
          var hrms_first_url = response.data;
          var hrms_second_url = response2.data;
          const hrms_array_data = hrms_first_url.split('\r\n');
          const hrms_array_data2 = hrms_second_url.split('\r\n');
          var hrms_arr1 = [];
          var hrms_arr2 = [];

          var final_one_url_array = [];
          var final_one_url_array1 = [];
          for (let i = 0; i < hrms_array_data2.length; i++) {
            const a = hrms_array_data2[i].split('|');
            hrms_arr2.push(a);
          }
          for (let i = 0; i < hrms_array_data.length; i++) {
            const a = hrms_array_data[i].split('|');
            hrms_arr1.push(a);
          }

          let new_obj = {};
          for (let i = 1; i < hrms_arr1.length - 1; i++) {
            for (let j = 0; j < hrms_arr1[i].length; j++) {
              new_obj[hrms_arr1[0][j]] = hrms_arr1[i][j];
              if (hrms_arr1[i].length - 1 === j) {
                final_one_url_array.push(new_obj);
                new_obj = {};
              }
            }
          }
          let new_obj2 = {};
          for (let i = 1; i < hrms_arr2.length; i++) {
            for (let j = 0; j < hrms_arr2[i].length; j++) {
              new_obj2[hrms_arr2[0][j]] = hrms_arr2[i][j];
              if (hrms_arr2[i].length - 1 === j) {
                final_one_url_array1.push(new_obj2);
                new_obj2 = {};
              }
            }
          }
          const merger_arr = [];
          for (let k = 0; k < final_one_url_array.length; k++) {
            for (let index = 0; index < final_one_url_array1.length; index++) {
              if (
                final_one_url_array[k].UserID === final_one_url_array1[index].id
              ) {
                const designation = {
                  designation: final_one_url_array1[index]['designation-name'],
                };

                const new_data = Object.assign(
                  {},
                  final_one_url_array[k],
                  designation,
                );
                merger_arr.push(new_data);
              }
            }
          }
          return res.json(merger_arr);
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}
