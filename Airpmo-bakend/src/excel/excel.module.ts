import { Module } from '@nestjs/common';
import { ExcelService } from './excel.service';
import { ExcelController } from './excel.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { excels, excelSchema } from 'src/schemas/excel.schema';

@Module({

  imports: [MongooseModule.forFeature([{ name:excels.name,schema:excelSchema }])],
  controllers: [ExcelController],
  providers: [ExcelService]
})
export class ExcelModule {}
