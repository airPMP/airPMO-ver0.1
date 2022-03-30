import { Test, TestingModule } from '@nestjs/testing';
import { MyJobCardEmployeeController } from './my-job-card-employee.controller';
import { MyJobCardEmployeeService } from './my-job-card-employee.service';

describe('MyJobCardEmployeeController', () => {
  let controller: MyJobCardEmployeeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MyJobCardEmployeeController],
      providers: [MyJobCardEmployeeService],
    }).compile();

    controller = module.get<MyJobCardEmployeeController>(MyJobCardEmployeeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
