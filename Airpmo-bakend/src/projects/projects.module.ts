import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { project, projectSchema } from 'src/schemas/projects.schema';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [MongooseModule.forFeature([{ name:project.name,schema:projectSchema }])],
  controllers: [ProjectsController],
  providers: [ProjectsService,],

})
export class ProjectsModule {}
