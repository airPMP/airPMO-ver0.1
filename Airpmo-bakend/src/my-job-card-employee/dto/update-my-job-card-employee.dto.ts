import { PartialType } from '@nestjs/swagger';
import { CreateMyJobCardEmployeeDto } from './create-my-job-card-employee.dto';

export class UpdateMyJobCardEmployeeDto extends PartialType(CreateMyJobCardEmployeeDto) {}
