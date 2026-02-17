import { Test, TestingModule } from '@nestjs/testing';
import { EditoraController } from './editora.controller';
import { EditoraService } from './editora.service';

describe('EditoraController', () => {
  let controller: EditoraController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EditoraController],
      providers: [EditoraService],
    }).compile();

    controller = module.get<EditoraController>(EditoraController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
