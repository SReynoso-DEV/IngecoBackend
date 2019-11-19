import { Test, TestingModule } from '@nestjs/testing';
import { RecibohonorarioController } from './recibohonorario.controller';

describe('Recibohonorario Controller', () => {
  let controller: RecibohonorarioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecibohonorarioController],
    }).compile();

    controller = module.get<RecibohonorarioController>(RecibohonorarioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
