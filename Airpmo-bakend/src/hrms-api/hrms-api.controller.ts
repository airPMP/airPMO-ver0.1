import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Response,
} from '@nestjs/common';
import { HrmsApiService } from './hrms-api.service';
import { CreateHrmsApiDto } from './dto/create-hrms-api.dto';
import { UpdateHrmsApiDto } from './dto/update-hrms-api.dto';

@Controller('api')
export class HrmsApiController {
  constructor(private readonly hrmsApiService: HrmsApiService) {}

  @Get('/hrms-api/:id')
  findAll(@Param('id') id: string,@Response()res) {
    return this.hrmsApiService.findAll(id,res);
  }
}
