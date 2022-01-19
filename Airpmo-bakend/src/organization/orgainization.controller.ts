import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrgainizationService } from './orgainization.service';
import { CreateOrgainizationDto } from './dto/create-orgainization.dto';
import { UpdateOrgainizationDto } from './dto/update-orgainization.dto';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('Organization Api')
@Controller('api')
export class OrgainizationController {
  constructor(private readonly orgainizationService: OrgainizationService) {}

  @Post('organization')
  create(@Body() createOrgainizationDto: CreateOrgainizationDto) {
    return this.orgainizationService.create(createOrgainizationDto);
  }

  @Get('organization')
  findAll() {
    return this.orgainizationService.findAll();
  }

  @Get('organization/:id')
  findOne(@Param('id') id: string) {
    return this.orgainizationService.findOne(id);
  }

  @Patch('organization/:id')
  update(@Param('id') id: string, @Body() updateOrgainizationDto: UpdateOrgainizationDto) {
   
    return this.orgainizationService.update(id, updateOrgainizationDto);
  }

  @Delete('organization/:id')
  remove(@Param('id') id: string) {
    return this.orgainizationService.remove(id);
  }
}
