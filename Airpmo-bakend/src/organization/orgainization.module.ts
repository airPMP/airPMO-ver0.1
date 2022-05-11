import { Module } from '@nestjs/common';
import { OrgainizationService } from './orgainization.service';
import { OrgainizationController } from './orgainization.controller';
import {
  orgainization,
  orgainizationSchema,
} from 'src/schemas/organization.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';
import { users, usersSchema } from 'src/schemas/users.schema';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      { name: orgainization.name, schema: orgainizationSchema },
      { name: users.name, schema: usersSchema},
    ]),
  ],
  controllers: [OrgainizationController],
  providers: [OrgainizationService],
  exports: [OrgainizationService],
})
export class OrgainizationModule {}
