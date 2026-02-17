import { Test, TestingModule } from '@nestjs/testing';
import { EditoraService } from './editora.service';

describe('EditoraService', () => {
  let service: EditoraService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EditoraService],
    }).compile();

    service = module.get<EditoraService>(EditoraService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
