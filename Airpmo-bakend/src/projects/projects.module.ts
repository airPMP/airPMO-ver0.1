import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { project, projectSchema } from 'src/schemas/projects.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';


@Module({
  imports: [MongooseModule.forFeature([{ name:project.name,schema:projectSchema }]),UsersModule],
  controllers: [ProjectsController],
  providers: [ProjectsService,],

})
export class ProjectsModule {}
