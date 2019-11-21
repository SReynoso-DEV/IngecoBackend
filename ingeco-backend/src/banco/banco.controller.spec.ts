import { Test, TestingModule } from '@nestjs/testing';
import { BancoController } from './banco.controller';

describe('Banco Controller', () => {
  let controller: BancoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BancoController],
    }).compile();

    controller = module.get<BancoController>(BancoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
