import { Test, TestingModule } from '@nestjs/testing';
import { MyJobCardEquipmentController } from './my-job-card-equipment.controller';
import { MyJobCardEquipmentService } from './my-job-card-equipment.service';

describe('MyJobCardEquipmentController', () => {
  let controller: MyJobCardEquipmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MyJobCardEquipmentController],
      providers: [MyJobCardEquipmentService],
    }).compile();

    controller = module.get<MyJobCardEquipmentController>(MyJobCardEquipmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
