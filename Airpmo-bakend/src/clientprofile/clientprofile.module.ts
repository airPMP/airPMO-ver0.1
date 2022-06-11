import { Module } from '@nestjs/common';
import { ClientprofileService } from './clientprofile.service';
import { ClientprofileController } from './clientprofile.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Client, ClientSchema } from 'src/schemas/client.schema';
import { UsersModule } from 'src/users/users.module';


@Module({
  imports: [MongooseModule.forFeature([{ name:Client.name,schema:ClientSchema }]),UsersModule],
  controllers: [ClientprofileController],
  providers: [ClientprofileService],
  
})
export class ClientprofileModule {}
