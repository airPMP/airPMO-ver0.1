import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Project Api')
@Controller('api')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) { }

  @Post('projects')
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @ApiBearerAuth()
  @Get('projects')
  findAll() {
    return this.projectsService.findAll();
  }

  @ApiBearerAuth()
  @Get('projects/:id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }

  @ApiBearerAuth()
  @Patch('projects/:id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(id, updateProjectDto);
  }

  @ApiBearerAuth()
  @Delete('projects/:id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(id);
  }


  @ApiBearerAuth()
  @Get('organization/:organization_id/project')
  findorganization(@Param('organization_id') organization_id: string) {
    return this.projectsService.findorganization(organization_id);
  }


  @ApiBearerAuth()
  @Get('catagories/:catagories_id/project')
  findcatagories(@Param('catagories_id') catagories_id: string) {
    return this.projectsService.findcatagories(catagories_id);
  }


  @ApiBearerAuth()
  @Get('client/:client_id/project')
  findclient(@Param('client_id') client_id: string) {
    return this.projectsService.findclient(client_id);
  }
}
