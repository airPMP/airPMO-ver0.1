import { PartialType } from '@nestjs/swagger';
import { CreateOrgainizationDto } from './create-orgainization.dto';

export class UpdateOrgainizationDto extends PartialType(CreateOrgainizationDto) {}
