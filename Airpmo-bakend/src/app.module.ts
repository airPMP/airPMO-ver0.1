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





@Module({

  imports: [MongooseModule.forRoot('mongodb://'+process.env.DB_HOST+':'+process.env.DB_PORT, {
    user:process.env.DB_USERNAME,
    pass:process.env.DB_PASSWORD,
    dbName:process.env.DATABASE,
    w: 'majority',
    retryWrites: true
  }
      ), UsersModule, AuthModule, ForgetModule, ClientprofileModule, CategoriesModule, ProjectsModule, OrgainizationModule, RolesModule, ],
      
})
export class AppModule {}
