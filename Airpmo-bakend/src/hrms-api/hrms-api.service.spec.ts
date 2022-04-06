import { Test, TestingModule } from '@nestjs/testing';
import { HrmsApiService } from './hrms-api.service';

describe('HrmsApiService', () => {
  let service: HrmsApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HrmsApiService],
    }).compile();

    service = module.get<HrmsApiService>(HrmsApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
