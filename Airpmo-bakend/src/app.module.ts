const dotenv =require('dotenv') 
dotenv.config()
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ForgetModule } from './forget/forget.module';
import { ClientprofileModule } from './clientprofile/clientprofile.module';
import { CategoriesModule } from './categories/categories.module';
import { ProjectsModule } from './projects/projects.module';
import { OrgainizationModule } from './organization/orgainization.module';
import { RolesModule } from './roles/roles.module';
import { ZoneModule } from './zone/zone.module';
import { SubzoneModule } from './subzone/subzone.module';
import { SubdividedzoneModule } from './subdividedzone/subdividedzone.module';
import { UserRolesModule } from './user-roles/user-roles.module';
import { PermissionModule } from './permission/permission.module';
import { ExcelModule } from './excel/excel.module';
import { JobCardsModule } from './job-cards/job-cards.module';
import { MyJobCardEmployeeModule } from './my-job-card-employee/my-job-card-employee.module';
import { MyJobCardEquipmentModule } from './my-job-card-equipment/my-job-card-equipment.module';
import { HrmsApiModule } from './hrms-api/hrms-api.module';
import { SpiCpiModule } from './spi-cpi/spi-cpi.module';
import { LocationModule } from './location/location.module';

@Module({
  imports: [MongooseModule.forRoot(`${process.env.DB_CONNECTION_URL}`), UsersModule, AuthModule, RolesModule, ForgetModule, ClientprofileModule, CategoriesModule, ProjectsModule, OrgainizationModule, ZoneModule, SubzoneModule, SubdividedzoneModule, UserRolesModule,PermissionModule,ExcelModule, JobCardsModule, MyJobCardEmployeeModule, MyJobCardEquipmentModule, HrmsApiModule, SpiCpiModule, LocationModule],

})
export class AppModule {}
