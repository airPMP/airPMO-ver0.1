import { PartialType } from '@nestjs/swagger';
import { CreateSubdividedzoneDto } from './create-subdividedzone.dto';

export class UpdateSubdividedzoneDto extends PartialType(CreateSubdividedzoneDto) {}
