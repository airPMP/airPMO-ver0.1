import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards ,Request} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/decorator/auth.decorator';

@ApiTags('Project Api')
@Controller('api')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) { }

  @Auth('CREATE-PROJECTS')
  @Post('projects')
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @Auth('GET-PROJECTS')
  @Get('projects')
  findAll() {
    return this.projectsService.findAll();
  }

  @Auth('GET-PROJECTS')
  @Get('projects/:id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }

  @Auth('EDIT-PROJECTS')
  @Patch('projects/:id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(id, updateProjectDto);
  }

  @Auth('DELETE-PROJECTS')
  @Delete('projects/:id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(id);
  }

  @Auth('GET-PROJECTS')
  @Get('organization/:organization_id/project')
  findorganization(@Param('organization_id') organization_id: string) {
    return this.projectsService.findorganization(organization_id);
  }


  @Auth('GET-PROJECTS')
  @Get('catagories/:catagories_id/project')
  findcatagories(@Param('catagories_id') catagories_id: string) {
    return this.projectsService.findcatagories(catagories_id);
  }

  @Auth('GET-PROJECTS')
  @Get('client/:client_id/project')
  findclient(@Param('client_id') client_id: string) {
    return this.projectsService.findclient(client_id);
  }
}
