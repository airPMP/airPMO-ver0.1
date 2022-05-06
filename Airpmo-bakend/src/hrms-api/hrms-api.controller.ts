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

  // @Auth()
  @Get('/hrms-api/:id/:particular_date')
  findAll(
    @Param('id') id: string,
    @Param('particular_date') particular_date: string,
    @Response() res,
  ) {
    return this.hrmsApiService.findAll(id, particular_date,res);
  }
}
