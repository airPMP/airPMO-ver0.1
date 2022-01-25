import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubzoneService } from './subzone.service';
import { CreateSubzoneDto } from './dto/create-subzone.dto';
import { UpdateSubzoneDto } from './dto/update-subzone.dto';
import { ApiTags } from '@nestjs/swagger';
import { Console } from 'console';

@ApiTags("Subzone Api")
@Controller('api')
export class SubzoneController {
  constructor(private readonly subzoneService: SubzoneService) {}
  @Post("subzone")
  create(@Body() createSubzoneDto: CreateSubzoneDto) {
    return this.subzoneService.create(createSubzoneDto);
  }

  @Get("subzone")
  findAll() {
    return this.subzoneService.findAll();
  }

  @Get('subzone/:id')
  findOne(@Param('id') id: string) {
    return this.subzoneService.findOne(id);
  }

  @Patch('subzone/:id')
  update(@Param('id') id: string, @Body() updateSubzoneDto: UpdateSubzoneDto) {
    return this.subzoneService.update(id, updateSubzoneDto);
  }

  @Delete('subzone/:id')
  remove(@Param('id') id: string) {
    return this.subzoneService.remove(id);
  }


  @Get('zone/:zone_id/subzone')
  findsubzone(@Param('zone_id') zone_id: string) {
    return this.subzoneService.findsubzone(zone_id);
  }


  @Get('organization/:organization_id/subzone')
  findorganization(@Param('organization_id') organization_id: string) {
    return this.subzoneService.findorganization(organization_id);
  }

}
