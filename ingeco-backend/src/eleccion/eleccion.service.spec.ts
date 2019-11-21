import { Test, TestingModule } from '@nestjs/testing';
import { EleccionService } from './eleccion.service';

describe('EleccionService', () => {
  let service: EleccionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EleccionService],
    }).compile();

    service = module.get<EleccionService>(EleccionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
