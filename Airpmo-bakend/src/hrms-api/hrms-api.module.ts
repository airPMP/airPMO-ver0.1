import { Module } from '@nestjs/common';
import { HrmsApiService } from './hrms-api.service';
import { HrmsApiController } from './hrms-api.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { hrms, hrmsSchema } from 'src/schemas/hrms.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: hrms.name, schema: hrmsSchema },
    ]),
  ],
  controllers: [HrmsApiController],
  providers: [HrmsApiService]
})
export class HrmsApiModule {}
