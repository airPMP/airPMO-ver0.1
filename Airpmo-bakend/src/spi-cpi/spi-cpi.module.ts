import { Module } from '@nestjs/common';
import { SpiCpiService } from './spi-cpi.service';
import { SpiCpiController } from './spi-cpi.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { spicpi, spicpiSchema } from 'src/schemas/spi_cpi.schema';
import { excels, excelSchema } from 'src/schemas/excel.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: spicpi.name, schema: spicpiSchema }]),
  ],
  controllers: [SpiCpiController],
  providers: [SpiCpiService],
})
export class SpiCpiModule {}
