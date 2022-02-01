import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ExcelService } from './excel.service';
import { CreateExcelDto } from './dto/create-excel.dto';
import { UpdateExcelDto } from './dto/update-excel.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('excel')
export class ExcelController {
  constructor(private readonly excelService: ExcelService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('files'))
 
  UploadExcelFile(@UploadedFile() files: Express.Multer.File) {
     return this.excelService.processFile(files);
  }


  @Get()
  findAll() {
    return this.excelService.findAll();
  }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.excelService.findOne(+id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateExcelDto: UpdateExcelDto) {
//     return this.excelService.update(+id, updateExcelDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.excelService.remove(+id);
//   }
// }
}