import { HttpModule, Module } from '@nestjs/common';
import { HrmsApiService } from './hrms-api.service';
import { HrmsApiController } from './hrms-api.controller';

@Module({
  controllers: [HrmsApiController],
  providers: [HrmsApiService]
})
export class HrmsApiModule {}
