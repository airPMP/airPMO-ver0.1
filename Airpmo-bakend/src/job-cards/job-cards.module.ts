import { Module } from '@nestjs/common';
import { JobCardsService } from './job-cards.service';
import { JobCardsController } from './job-cards.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { jobcard, jobcardSchema } from 'src/schemas/job_card.schema';
import { UsersModule } from 'src/users/users.module';
import { excelSchema } from 'src/schemas/excel.schema';
import { ExcelModule } from 'src/excel/excel.module';
import { jobcardassign, jobcardassignSchema } from 'src/schemas/job_card_assigen.schema';
import { myjobcard, myjobcardschema } from 'src/schemas/my_job_card.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: jobcard.name, schema: jobcardSchema },
  { name: jobcardassign.name, schema: jobcardassignSchema },
  { name: myjobcard.name, schema: myjobcardschema }]), ExcelModule],
  controllers: [JobCardsController],
  providers: [JobCardsService]

})
export class JobCardsModule { }
