import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ZoneService } from './zone.service';
import { CreateZoneDto } from './dto/create-zone.dto';
import { UpdateZoneDto } from './dto/update-zone.dto';
import { ApiTags } from '@nestjs/swagger';


@ApiTags("Zone Api")
@Controller('api')
export class ZoneController {
  constructor(private readonly zoneService: ZoneService) {}

  @Post("zone")
  create(@Body() createZoneDto: CreateZoneDto) {
    return this.zoneService.create(createZoneDto);
  }

  @Get("zone")
  findAll() {
    return this.zoneService.findAll();
  }

  @Get('zone/:id')
  findOne(@Param('id') id: string) {
    return this.zoneService.findOne(id);
  }

  @Patch('zone/:id')
  update(@Param('id') id: string, @Body() updateZoneDto: UpdateZoneDto) {
    return this.zoneService.update(id, updateZoneDto);
  }

  @Delete('zone/:id')
  remove(@Param('id') id: string) {
    return this.zoneService.remove(id);
  }


  @Get('organization/:organization_id/zone')
  findorganization(@Param('organization_id') organization_id: string) {
    return this.zoneService.findorganization(organization_id);
  }


  @Get('project/:project_id/zone')
  findproject(@Param('project_id') project_id: string) {
    return this.zoneService.findproject(project_id);
  }
}
