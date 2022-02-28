import { Controller, Post, UseInterceptors, Req, UploadedFiles, Get, Param, Patch } from '@nestjs/common';
import { ExcelService } from './excel.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/decorator/auth.decorator';

@ApiTags("Excel Api")
@Controller('api/')
export class ExcelController {
  constructor(private readonly excelService: ExcelService) { }
  @Auth('CREATE-PRODUCTIVE_SHEET')
  @Post('upload_productive_file')
  @UseInterceptors(AnyFilesInterceptor())
  async uploadFile(@UploadedFiles() files: Array<Express.Multer.File>, @Req() req) {
    return await this.excelService.productiveFile(files, req)
  }


  @Auth('GET-PRODUCTIVE_SHEET')
  @Get('upload_productive_file/:projectid')
  findone(@Param('projectid') projectid: string) {
    return this.excelService.findOne(projectid);
  }


  @Auth('EDIT-PRODUCTIVE_SHEET')
  @Patch('update_productive_file')
  @UseInterceptors(AnyFilesInterceptor())
  async uploaddraftProductiveFile( @Req() req ,@UploadedFiles() files: Array<Express.Multer.File>) {
    return await this.excelService.updateProductiveFile(files,req )
  }
}
