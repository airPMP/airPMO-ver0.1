import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Req, UploadedFiles } from '@nestjs/common';
import { ExcelService } from './excel.service';
import { AnyFilesInterceptor, FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Excel Api")
@Controller('api/')
export class ExcelController {
  constructor(private readonly excelService: ExcelService) {}

  @Post('upload')
@UseInterceptors(AnyFilesInterceptor())
async uploadFile(@UploadedFiles() files: Array<Express.Multer.File>,@Req() req) {
  // console.log(req.body.projectid);
  return await this.excelService.processFile(files,req) 
}

  









//   @Get('excel')
//   findAll() {
//     return this.excelService.findAll();
//   }

//   @Get('excel/:id')
//   findOne(@Param('id') id: string) {
//     return this.excelService.findOne(id);
//   }

//   // @Patch('excel/:id')
//   // update(@Param('id') id: string, @Body() @Req() req) {
//   //   return this.excelService.update(id, req);
//   // }

//   @Delete('excel/:id')
//   remove(@Param('id') id: string) {
//     return this.excelService.remove(id);
//   }
}
