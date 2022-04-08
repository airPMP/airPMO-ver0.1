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
  @Post('/create_spi_calculation')
  create(@Body() createSpiCpiDto: CreateSpiCpiDto) {
    return this.spiCpiService.create(createSpiCpiDto);
  }

  @Auth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSpiCpiDto: UpdateSpiCpiDto) {
    console.log(id);
    return this.spiCpiService.update(id, updateSpiCpiDto);
  }
}
