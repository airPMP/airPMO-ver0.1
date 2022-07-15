import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateOrgainizationDto {
  @IsString()
  // @IsNotEmpty()
  @ApiProperty()
  hrms_api_url: string;

  @IsString()
  // @IsNotEmpty()
  @ApiProperty()
  location: string;

  @IsOptional()
  @ApiProperty()
  discription: string;

  @IsOptional()
  @ApiProperty()
  logo_url: string;

  @IsOptional()
  @ApiProperty()
  spread_sheet_id: string;

  @IsOptional()
  @ApiProperty()
  user_id: string;

  @IsString()
  // @IsNotEmpty()
  @ApiProperty()
  address: string;

  @ApiProperty()
  contact_details: string;

  @IsString()
  // @IsNotEmpty()
  @ApiProperty()
  name: string;

  @ApiProperty()
  hrms_format: string;

  @ApiProperty()
  equipments_list: string;

  @ApiProperty()
  hrms_salary: string;

  @ApiProperty()
  hrms_rental: string;

  @ApiProperty()
  hrms_url_api: string;

  @ApiProperty()
  hrms_api_url_id: string;

  @ApiProperty()
  hrms_api_or_sheet: boolean;

  @ApiProperty()
  organization_image_url: string;

  @ApiProperty()
  spread_sheet_id1: string;

  @ApiProperty()
  spread_sheet_id2: string;

  @ApiProperty()
  spread_sheet_id3: string;

  @ApiProperty()
  spread_sheet_id4: string;

  @ApiProperty()
  domain: string;
}
