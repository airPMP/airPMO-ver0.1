import { PartialType } from '@nestjs/swagger';
import { CreateMyJobCardEquipmentDto } from './create-my-job-card-equipment.dto';

export class UpdateMyJobCardEquipmentDto extends PartialType(CreateMyJobCardEquipmentDto) {}
