import { Injectable } from '@nestjs/common';
import { CreateHrmsApiDto } from './dto/create-hrms-api.dto';
import { UpdateHrmsApiDto } from './dto/update-hrms-api.dto';
import fetch from 'node-fetch';


@Injectable()
export class HrmsApiService {
 async findAll() {
    const response = await fetch('http://abe.fortiddns.com:7993/cosec/api.svc/v2/attendance-daily?action=get;range=section;id=59');
  }
}
