import { Module } from '@nestjs/common';
import { JobCardsService } from './job-cards.service';
import { JobCardsController } from './job-cards.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { jobcard, jobcardSchema } from 'src/schemas/job_card.schema';
import { UsersModule } from 'src/users/users.module';
import { excels, excelSchema } from 'src/schemas/excel.schema';
import { ExcelModule } from 'src/excel/excel.module';
import { jobcardassign, jobcardassignSchema } from 'src/schemas/job_card_assigen.schema';
import { myjobcard, myjobcardschema } from 'src/schemas/my_job_card.schema';
import { UserRole, UserRoleSchema } from 'src/schemas/user_roles.schema';
import { Role, RoleSchema } from 'src/schemas/roles.schema';
import { spicpi, spicpiSchema } from 'src/schemas/spi_cpi.schema';
import { MyJobCardEmployee } from 'src/my-job-card-employee/entities/my-job-card-employee.entity';
import { MyJobCardEmployeeModule } from 'src/my-job-card-employee/my-job-card-employee.module';
import { myjobcardemployee, myjobcardemployeeschema } from 'src/schemas/my-job-card-employee.schema';
import { project, projectSchema } from 'src/schemas/projects.schema';
@Module({
  imports: [MongooseModule.forFeature([{ name: jobcard.name, schema: jobcardSchema },
  { name: jobcardassign.name, schema: jobcardassignSchema },
  { name: myjobcard.name, schema: myjobcardschema },
  { name:UserRole.name,schema:UserRoleSchema, },
  { name:excels.name,schema:excelSchema },
  { name: spicpi.name, schema: spicpiSchema },
  { name: project.name, schema: projectSchema },
  { name:Role.name,schema:RoleSchema },
  { name: myjobcardemployee.name, schema: myjobcardemployeeschema }
  ]), ExcelModule,UsersModule],
  controllers: [JobCardsController],
  providers: [JobCardsService]

})
export class JobCardsModule { }
