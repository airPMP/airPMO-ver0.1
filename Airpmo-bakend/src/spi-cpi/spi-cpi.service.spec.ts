import { Test, TestingModule } from '@nestjs/testing';
import { SpiCpiService } from './spi-cpi.service';

describe('SpiCpiService', () => {
  let service: SpiCpiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpiCpiService],
    }).compile();

    service = module.get<SpiCpiService>(SpiCpiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
