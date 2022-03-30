import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { users, usersSchema } from 'src/schemas/users.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRolesModule } from 'src/user-roles/user-roles.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: users.name, schema: usersSchema }]),
    forwardRef(() => UserRolesModule),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
