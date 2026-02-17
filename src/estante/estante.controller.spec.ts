import { Test, TestingModule } from '@nestjs/testing';
import { EstanteController } from './estante.controller';
import { EstanteService } from './estante.service';

describe('EstanteController', () => {
  let controller: EstanteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstanteController],
      providers: [EstanteService],
    }).compile();

    controller = module.get<EstanteController>(EstanteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
