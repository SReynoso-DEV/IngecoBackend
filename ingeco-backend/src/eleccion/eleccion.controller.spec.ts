import { Test, TestingModule } from '@nestjs/testing';
import { EleccionController } from './eleccion.controller';

describe('Eleccion Controller', () => {
  let controller: EleccionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EleccionController],
    }).compile();

    controller = module.get<EleccionController>(EleccionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
