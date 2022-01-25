import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubdividedzoneService } from './subdividedzone.service';
import { CreateSubdividedzoneDto } from './dto/create-subdividedzone.dto';
import { UpdateSubdividedzoneDto } from './dto/update-subdividedzone.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags("Sub Divided Zone")
@Controller('api')
export class SubdividedzoneController {
  constructor(private readonly subdividedzoneService: SubdividedzoneService) { }

  @Post("sub_divided_zone")
  create(@Body() createSubdividedzoneDto: CreateSubdividedzoneDto) {
    return this.subdividedzoneService.create(createSubdividedzoneDto);
  }

  @Get("sub_divided_zone")
  findAll() {
    return this.subdividedzoneService.findAll();
  }

  @Get('/sub_divided_zone/:id')
  findOne(@Param('id') id: string) {
    return this.subdividedzoneService.findOne(id);
  }

  

  @Patch('/sub_divided_zone/:id')
  update(@Param('id') id: string, @Body() updateSubdividedzoneDto: UpdateSubdividedzoneDto) {
    return this.subdividedzoneService.update(id, updateSubdividedzoneDto);
  }

  @Delete('/sub_divided_zone/:id')
  remove(@Param('id') id: string) {
    return this.subdividedzoneService.remove(id);
  }

  @Get('/subzone/:subzone_id/sub_divided_zone')
  findsubdivided(@Param('subzone_id') subzone_id: string) {
    return this.subdividedzoneService.findsubdivided(subzone_id);
  }
 

  @Get('/organization/:organization_id/sub_divided_zone')
  findorganization(@Param('organization_id')organization_id: string) {
    return this.subdividedzoneService.findorganization(organization_id);
  }
}
