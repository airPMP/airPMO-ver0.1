import { Module } from '@nestjs/common';
import { JobCardsService } from './job-cards.service';
import { JobCardsController } from './job-cards.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { jobcard, jobcardSchema } from 'src/schemas/job_card.schema';
import { UsersModule } from 'src/users/users.module';
import { excelSchema } from 'src/schemas/excel.schema';
import { ExcelModule } from 'src/excel/excel.module';
import { jobcardassign, jobcardassignSchema } from 'src/schemas/job_card_assigen.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name:jobcard.name,schema:jobcardSchema },{name:jobcardassign.name,schema:jobcardassignSchema }]),ExcelModule],
  controllers: [JobCardsController],
  providers: [JobCardsService]
  
})
export class JobCardsModule {}
