import { Module } from '@nestjs/common';
import { OrgainizationService } from './orgainization.service';
import { OrgainizationController } from './orgainization.controller';
import { orgainization, orgainizationSchema } from 'src/schemas/organization.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name:orgainization.name,schema:orgainizationSchema }])],
  controllers: [OrgainizationController],
  providers: [OrgainizationService],
  exports:[OrgainizationService]
})
export class OrgainizationModule {}
