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
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/decorator/auth.decorator';
import { HrmsApiService } from './hrms-api.service';

@ApiTags('hrms api')
@Controller('api')
export class HrmsApiController {
  constructor(private readonly hrmsApiService: HrmsApiService) {}

  @Auth()
  @Get('/hrms-api/:id')
  findAll(@Param('id') id: string, @Response() res) {
    console.log(id);
    return this.hrmsApiService.findAll(id, res);
  }
}
