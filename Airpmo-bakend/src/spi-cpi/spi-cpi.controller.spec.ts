import { Test, TestingModule } from '@nestjs/testing';
import { SpiCpiController } from './spi-cpi.controller';
import { SpiCpiService } from './spi-cpi.service';

describe('SpiCpiController', () => {
  let controller: SpiCpiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpiCpiController],
      providers: [SpiCpiService],
    }).compile();

    controller = module.get<SpiCpiController>(SpiCpiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
