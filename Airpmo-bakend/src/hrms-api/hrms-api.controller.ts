import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HrmsApiService } from './hrms-api.service';
import { CreateHrmsApiDto } from './dto/create-hrms-api.dto';
import { UpdateHrmsApiDto } from './dto/update-hrms-api.dto';

@Controller('api/')
export class HrmsApiController {
  constructor(private readonly hrmsApiService: HrmsApiService) {}

  @Get('get_hrms_data')
  findAll() {
    return this.hrmsApiService.findAll();
  }
}
