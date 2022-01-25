import { PartialType } from '@nestjs/swagger';
import { CreateSubzoneDto } from './create-subzone.dto';

export class UpdateSubzoneDto extends PartialType(CreateSubzoneDto) {}
