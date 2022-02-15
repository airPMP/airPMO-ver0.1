import { Controller, Post, UseInterceptors, Req, UploadedFiles } from '@nestjs/common';
import { ExcelService } from './excel.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/decorator/auth.decorator';

@ApiTags("Excel Api")
@Controller('api/')
export class ExcelController {
  constructor(private readonly excelService: ExcelService) { }
  @Auth('CREATE/EDIT-PRODUCTIVE_SHEET')
  @Post('upload_productive_file')
  @UseInterceptors(AnyFilesInterceptor())
  async uploadFile(@UploadedFiles() files: Array<Express.Multer.File>, @Req() req) {
    return await this.excelService.productiveFile(files, req)
  }



@Post('upload_quantity_file')
  @UseInterceptors(AnyFilesInterceptor())
  async quantityFile(@UploadedFiles() files: Array<Express.Multer.File>, @Req() req) {
    return await this.excelService.quantityFile(files, req)
  }
  
}