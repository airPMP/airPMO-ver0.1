import { Test, TestingModule } from '@nestjs/testing';
import { MyJobCardEmployeeService } from './my-job-card-employee.service';

describe('MyJobCardEmployeeService', () => {
  let service: MyJobCardEmployeeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MyJobCardEmployeeService],
    }).compile();

    service = module.get<MyJobCardEmployeeService>(MyJobCardEmployeeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
