import { Test, TestingModule } from '@nestjs/testing';
import { RecibohonorarioService } from './recibohonorario.service';

describe('RecibohonorarioService', () => {
  let service: RecibohonorarioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecibohonorarioService],
    }).compile();

    service = module.get<RecibohonorarioService>(RecibohonorarioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
