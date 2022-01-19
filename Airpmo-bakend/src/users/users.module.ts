import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { users, usersSchema } from 'src/schemas/users.schema';
import { MongooseModule } from '@nestjs/mongoose';



@Module({
  imports: [MongooseModule.forFeature([{ name: users.name, schema: usersSchema }])],
  controllers: [UsersController],
  providers: [UsersService],
  exports:[UsersService]
  
})
export class UsersModule {}
