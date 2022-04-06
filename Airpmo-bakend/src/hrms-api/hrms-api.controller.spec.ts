import { Test, TestingModule } from '@nestjs/testing';
import { HrmsApiController } from './hrms-api.controller';
import { HrmsApiService } from './hrms-api.service';

describe('HrmsApiController', () => {
  let controller: HrmsApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HrmsApiController],
      providers: [HrmsApiService],
    }).compile();

    controller = module.get<HrmsApiController>(HrmsApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
