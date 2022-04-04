import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import {  ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/decorator/auth.decorator';
import { ClientprofileService } from './clientprofile.service';
import { CreateClientprofileDto } from './dto/create-clientprofile.dto';
import { UpdateClientprofileDto } from './dto/update-clientprofile.dto';


@ApiTags('Client Api')
@Controller('api')
export class ClientprofileController {
  constructor(private readonly clientprofileService: ClientprofileService) {}

  @Auth('CREATE-CLIENTS')
  @Post('client')
  create(@Body() createClientprofileDto: CreateClientprofileDto) {
    return this.clientprofileService.create(createClientprofileDto);
  }

  @Auth('GET-CLIENTS')
  @Get('client')
  findAll(@Req() req) {
    return this.clientprofileService.findAll(req);
  }

  @Auth('GET-CLIENTS')
  @Get('client/:id')
  findOne(@Param('id') id: string,@Req() req) {
    return this.clientprofileService.findOne(id,req);
  }

  @Auth('EDIT-CLIENTS')
  @Patch('client/:id')
  update(@Param('id') id: string, @Body() updateClientprofileDto: UpdateClientprofileDto) {
    return this.clientprofileService.update(id, updateClientprofileDto);
  }

  @Auth('DELETE-CLIENTS')
  @Delete('client/:id')
  remove(@Param('id') id: string) {
    return this.clientprofileService.remove(id);
  }

  @Auth('GET-CLIENTS')
  @Get('/organization/:organization_id/client')
  findorganization(@Param('organization_id') organization_id: string) {
    return this.clientprofileService.findorganization(organization_id);
  }
}
