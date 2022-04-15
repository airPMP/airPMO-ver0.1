import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SpiCpiService } from './spi-cpi.service';
import { CreateSpiCpiDto } from './dto/create-spi-cpi.dto';
import { UpdateSpiCpiDto } from './dto/update-spi-cpi.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/decorator/auth.decorator';

@ApiTags('spi-cpi')
@Controller('api')
export class SpiCpiController {
  constructor(private readonly spiCpiService: SpiCpiService) {}

  @Auth()
  @Post('/job_card_create_data')
  create(@Body() createSpiCpiDto: CreateSpiCpiDto) {
    return this.spiCpiService.create(createSpiCpiDto);
  }

  @Auth()
  @Get('/get_create_job_card_cal/:id')
  getjobcardcal(@Param('id') id: string) {
    return this.spiCpiService.getjobcardcal(id);
  }

  @Auth()
  @Patch('update_create_job_card_cal:id/:activity_code')
  update(
    @Param('id') id: string,
    @Param('activity_code') activity_code: string,
    @Body() updateSpiCpiDto: UpdateSpiCpiDto,
  ) {
    return this.spiCpiService.update(id,activity_code,updateSpiCpiDto);
  }

  @Auth()
  @Delete('delete_create_job_card_cal/:id')
  remove(@Param('id') id: string) {
    return this.spiCpiService.remove(id);
  }
}
