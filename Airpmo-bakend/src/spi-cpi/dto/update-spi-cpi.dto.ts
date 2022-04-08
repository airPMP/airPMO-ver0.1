import { PartialType } from '@nestjs/swagger';
import { CreateSpiCpiDto } from './create-spi-cpi.dto';

export class UpdateSpiCpiDto extends PartialType(CreateSpiCpiDto) {}
