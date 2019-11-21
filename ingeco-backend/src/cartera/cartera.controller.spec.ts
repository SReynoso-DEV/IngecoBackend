import { Test, TestingModule } from '@nestjs/testing';
import { CarteraController } from './cartera.controller';

describe('Cartera Controller', () => {
  let controller: CarteraController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarteraController],
    }).compile();

    controller = module.get<CarteraController>(CarteraController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
