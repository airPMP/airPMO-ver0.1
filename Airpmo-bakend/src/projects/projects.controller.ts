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

  @Auth('CREATE-PROJECT')
  @Post('projects')
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @Auth('GET-PROJECT')
  @Get('projects')
  findAll() {
    return this.projectsService.findAll();
  }

  @Auth('GET-PROJECT')
  @Get('projects/:id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }

  @Auth('EDIT-PROJECT')
  @Patch('projects/:id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(id, updateProjectDto);
  }

  @Auth('DELETE-PROJECT')
  @Delete('projects/:id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(id);
  }
}
