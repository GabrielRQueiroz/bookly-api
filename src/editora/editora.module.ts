import { Module } from '@nestjs/common';
import { EditoraController } from './editora.controller';
import { EditoraService } from './editora.service';

@Module({
  controllers: [EditoraController],
  providers: [EditoraService],
})
export class EditoraModule { }
