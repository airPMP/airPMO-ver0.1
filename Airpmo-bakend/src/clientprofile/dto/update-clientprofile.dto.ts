import { PartialType } from '@nestjs/swagger';
import { CreateClientprofileDto } from './create-clientprofile.dto';

export class UpdateClientprofileDto extends PartialType(CreateClientprofileDto) {}
