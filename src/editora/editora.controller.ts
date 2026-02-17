import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EditoraService } from './editora.service';
import { CreateEditoraDto } from './dto/create-editora.dto';
import { UpdateEditoraDto } from './dto/update-editora.dto';

@Controller('editora')
export class EditoraController {
  constructor(private readonly editoraService: EditoraService) {}

  @Post()
  create(@Body() createEditoraDto: CreateEditoraDto) {
    return this.editoraService.create(createEditoraDto);
  }

  @Get()
  findAll() {
    return this.editoraService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.editoraService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEditoraDto: UpdateEditoraDto) {
    return this.editoraService.update(+id, updateEditoraDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.editoraService.remove(+id);
  }
}
