import { Test, TestingModule } from '@nestjs/testing';
import { TasaController } from './tasa.controller';

describe('Tasa Controller', () => {
  let controller: TasaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasaController],
    }).compile();

    controller = module.get<TasaController>(TasaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
