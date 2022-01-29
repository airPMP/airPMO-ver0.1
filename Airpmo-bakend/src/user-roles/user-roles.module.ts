import { Module } from '@nestjs/common';
import { UserRolesService } from './user-roles.service';
import { UserRolesController } from './user-roles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRole, UserRoleSchema } from 'src/schemas/user_roles.schema';
import { RolesModule } from 'src/roles/roles.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [MongooseModule.forFeature([{ name:UserRole.name,schema:UserRoleSchema }]),RolesModule,UsersModule],
  controllers: [UserRolesController],
  providers: [UserRolesService],
  exports:[UserRolesService]
})
export class UserRolesModule {}
