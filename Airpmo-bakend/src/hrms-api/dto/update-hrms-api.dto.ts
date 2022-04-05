import { PartialType } from '@nestjs/swagger';
import { CreateHrmsApiDto } from './create-hrms-api.dto';

export class UpdateHrmsApiDto extends PartialType(CreateHrmsApiDto) {}
