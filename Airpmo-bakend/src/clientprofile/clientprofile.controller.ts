import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ClientprofileService } from './clientprofile.service';
import { CreateClientprofileDto } from './dto/create-clientprofile.dto';
import { UpdateClientprofileDto } from './dto/update-clientprofile.dto';


@ApiTags('Client Api')
@Controller('api')
export class ClientprofileController {
  constructor(private readonly clientprofileService: ClientprofileService) {}


 
  @Post('client')
  create(@Body() createClientprofileDto: CreateClientprofileDto) {
    return this.clientprofileService.create(createClientprofileDto);
  }

 @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('client')
  findAll() {
    return this.clientprofileService.findAll();
  }
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('client/:id')
  findOne(@Param('id') id: string) {
    return this.clientprofileService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Patch('client/:id')
  update(@Param('id') id: string, @Body() updateClientprofileDto: UpdateClientprofileDto) {
    return this.clientprofileService.update(id, updateClientprofileDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('client/:id')
  remove(@Param('id') id: string) {
    return this.clientprofileService.remove(id);
  }
}
