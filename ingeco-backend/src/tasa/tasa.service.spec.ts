import { Test, TestingModule } from '@nestjs/testing';
import { TasaService } from './tasa.service';

describe('TasaService', () => {
  let service: TasaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasaService],
    }).compile();

    service = module.get<TasaService>(TasaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
