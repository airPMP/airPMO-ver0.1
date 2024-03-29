import {
  Controller,
  Post,
  UseInterceptors,
  Req,
  UploadedFiles,
  Get,
  Param,
  Patch,
  Body,
} from '@nestjs/common';
import { ExcelService } from './excel.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { Auth } from 'src/decorator/auth.decorator';
import { ApiTags } from '@nestjs/swagger';
import { CreateExcelDto } from './dto/create-excel.dto';

@ApiTags('files')
@Controller('api/')
export class ExcelController {
  constructor(private readonly excelService: ExcelService) {}
  @Auth('CREATE-SHEET')
  @Post('upload_productive_file')
  @UseInterceptors(AnyFilesInterceptor())
  async uploadFile(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Req() req,
  ) {
    return await this.excelService.productiveFile(files, req);
  }

  @Auth('GET-SHEET')
  @Get('upload_productive_file/:projectid')
  findone(@Param('projectid') projectid: string, @Req() req) {
    return this.excelService.findOne(projectid, req);
  }

  @Auth('CREATE-SHEET')
  @Post("check_multiple_file")
  @UseInterceptors(AnyFilesInterceptor())
  async uploadMultiFile(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Req() req,
  ) {
    return await this.excelService.checkSheet(files, req);
  }
  // get(@Req() req) {
  //   return this.excelService.checkSheet(req);
  // }

  @Auth('CREATE-SHEET')
  @Post('upload_quantity_file')
  @UseInterceptors(AnyFilesInterceptor())
  async quantityFile(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Req() req,
  ) {
    return await this.excelService.quantityFile(files, req);
  }

  @Auth('CREATE-SHEET')
  @Post('upload_fire_quantity_file')
  @UseInterceptors(AnyFilesInterceptor())
  async firequantityFile(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Req() req,
  ) {
    return await this.excelService.firequantityFile(files, req);
  }

  @Auth('CREATE-SHEET')
  @Post('upload_light_fitting_quantity_file')
  @UseInterceptors(AnyFilesInterceptor())
  async lightquantityFile(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Req() req,
  ) {
    return await this.excelService.lightquantityFile(files, req);
  }

  @Auth('EDIT-SHEET')
  @Patch('update/productive/wiring/light/fire_sheet')
  async updateFile(@Req() req, @Body() CreateExcelDto: CreateExcelDto) {
    return await this.excelService.updateproductiveFile(req, CreateExcelDto);
  }
}
