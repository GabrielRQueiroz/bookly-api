import { Injectable } from '@nestjs/common';
import { CreateEditoraDto } from './dto/create-editora.dto';
import { UpdateEditoraDto } from './dto/update-editora.dto';

@Injectable()
export class EditoraService {
  create(createEditoraDto: CreateEditoraDto) {
    return 'This action adds a new editora';
  }

  findAll() {
    return `This action returns all editora`;
  }

  findOne(id: number) {
    return `This action returns a #${id} editora`;
  }

  update(id: number, updateEditoraDto: UpdateEditoraDto) {
    return `This action updates a #${id} editora`;
  }

  remove(id: number) {
    return `This action removes a #${id} editora`;
  }
}
