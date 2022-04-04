import { Test, TestingModule } from '@nestjs/testing';
import { MyJobCardEquipmentService } from './my-job-card-equipment.service';

describe('MyJobCardEquipmentService', () => {
  let service: MyJobCardEquipmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MyJobCardEquipmentService],
    }).compile();

    service = module.get<MyJobCardEquipmentService>(MyJobCardEquipmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
