import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Req } from '@nestjs/common';
import { ExcelService } from './excel.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Excel Api")
@Controller('api/')
export class ExcelController {
  constructor(private readonly excelService: ExcelService) {}

  @Post('excel')
  @UseInterceptors(FileInterceptor('files'))
  UploadExcelFile(@UploadedFile() files: Express.Multer.File) {
     return this.excelService.processFile(files);
  }

  @Get('excel')
  findAll() {
    return this.excelService.findAll();
  }

  @Get('excel/:id')
  findOne(@Param('id') id: string) {
    return this.excelService.findOne(id);
  }

  // @Patch('excel/:id')
  // update(@Param('id') id: string, @Body() @Req() req) {
  //   return this.excelService.update(id, req);
  // }

  @Delete('excel/:id')
  remove(@Param('id') id: string) {
    return this.excelService.remove(id);
  }
}
