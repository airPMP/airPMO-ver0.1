import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrgainizationService } from './orgainization.service';
import { CreateOrgainizationDto } from './dto/create-orgainization.dto';
import { UpdateOrgainizationDto } from './dto/update-orgainization.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/decorator/auth.decorator';


@ApiTags('Organization Api')
@Controller('api')
export class OrgainizationController {
  constructor(private readonly orgainizationService: OrgainizationService) {}

  @Auth('CREATE-ORGANIZATION')
  @Post('organization')
  create(@Body() createOrgainizationDto: CreateOrgainizationDto) {
    return this.orgainizationService.create(createOrgainizationDto);
  }

  @Auth('GET-ORGANIZATION')
  @Get('organization')
  findAll() {
    return this.orgainizationService.findAll();
  }
  
  @Auth('GET-ORGANIZATION')
  @Get('organization/:id')
  findOne(@Param('id') id: string) {
    return this.orgainizationService.findOne(id);
  }

  @Auth('EDIT-ORGANIZATION')
  @Patch('organization/:id')
  update(@Param('id') id: string, @Body() updateOrgainizationDto: UpdateOrgainizationDto) {
   
    return this.orgainizationService.update(id, updateOrgainizationDto);
  }

  @Auth('DELETE-ORGANIZATION')
  @Delete('organization/:id')
  remove(@Param('id') id: string) {
    return this.orgainizationService.remove(id);
  }

  @Auth('GET-ORGANIZATION')
  @Get('/user/:user_id/organization')
  finduser(@Param('user_id') user_id: string) {
    return this.orgainizationService.finduser(user_id);
  }

}
