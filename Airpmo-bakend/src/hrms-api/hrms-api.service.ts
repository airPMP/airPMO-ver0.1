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

    axios(config)
      .then(function (response) {
        var final_hrms_array = [];
        var hrms_arr = [];
        var hrms_all_data = response.data;
        const myArray = hrms_all_data.split('\r\n');
        for (let i = 0; i < myArray.length; i++) {
          const a = myArray[i].split('|');
          hrms_arr.push(a);
        }
        let new_obj = {};

        for (let i = 1; i < hrms_arr.length - 1; i++) {
          for (let j = 0; j < hrms_arr[i].length; j++) {
            new_obj[hrms_arr[0][j]] = hrms_arr[i][j];
            if (hrms_arr[i].length - 1 === j) {
              final_hrms_array.push(new_obj);
              new_obj = {};
            }
          }
        }
        return res.json(final_hrms_array);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}
