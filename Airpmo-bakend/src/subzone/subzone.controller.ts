import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { SubzoneService } from './subzone.service';
import { CreateSubzoneDto } from './dto/create-subzone.dto';
import { UpdateSubzoneDto } from './dto/update-subzone.dto';
import { ApiTags } from '@nestjs/swagger';
import { Console } from 'console';
import { Auth } from 'src/decorator/auth.decorator';

@ApiTags("Subzone Api")
@Controller('api')
export class SubzoneController {
  constructor(private readonly subzoneService: SubzoneService) {}

  @Auth('CREATE-SUBZONES')
  @Post("subzone")
  create(@Body() createSubzoneDto: CreateSubzoneDto) {
    return this.subzoneService.create(createSubzoneDto);
  }

  @Auth('GET-SUBZONES')
  @Get("subzone")
  findAll(@Req() req) {
    return this.subzoneService.findAll(req);
  }

  @Auth('GET-SUBZONES')
  @Get('subzone/:id')
  findOne(@Param('id') id: string,@Req() req) {
    return this.subzoneService.findOne(id,req);
  }

  @Auth('EDIT-SUBZONES')
  @Patch('subzone/:id')
  update(@Param('id') id: string, @Body() updateSubzoneDto: UpdateSubzoneDto) {
    return this.subzoneService.update(id, updateSubzoneDto);
  }

  @Auth('DELETE-SUBZONES')
  @Delete('subzone/:id')
  remove(@Param('id') id: string) {
    return this.subzoneService.remove(id);
  }

  @Auth('GET-SUBZONES')
  @Get('zone/:zone_id/subzone')
  findsubzone(@Param('zone_id') zone_id: string,@Req() req) {
    return this.subzoneService.findsubzone(zone_id,req);
  }

  @Auth('GET-SUBZONES')
  @Get('organization/:organization_id/subzone')
  findorganization(@Param('organization_id') organization_id: string) {
    return this.subzoneService.findorganization(organization_id);
  }

}
