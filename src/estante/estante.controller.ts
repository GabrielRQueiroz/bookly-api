import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { type Usuario } from 'generated/prisma/client';
import { UsuarioAtivo } from 'src/common/decorators/usuario-ativo.decorator';
import { CreateEstanteDto } from './dto/create-estante.dto';
import { UpdateEstanteDto } from './dto/update-estante.dto';
import { EstanteService } from './estante.service';

@Controller('estante')
export class EstanteController {
  constructor(private readonly estanteService: EstanteService) {}

  @Post()
  create(
    @Body() createEstanteDto: CreateEstanteDto,
    @UsuarioAtivo() usuarioId: Usuario['id'],
  ) {
    return this.estanteService.create(createEstanteDto, usuarioId);
  }

  @Get()
  findAll(@UsuarioAtivo() usuarioId: Usuario['id']) {
    return this.estanteService.findAll(usuarioId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @UsuarioAtivo() usuarioId: Usuario['id']) {
    return this.estanteService.findOne(+id, usuarioId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEstanteDto: UpdateEstanteDto,
    @UsuarioAtivo() usuarioId: Usuario['id'],
  ) {
    return this.estanteService.update(+id, updateEstanteDto, usuarioId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @UsuarioAtivo() usuarioId: Usuario['id']) {
    return this.estanteService.remove(+id, usuarioId);
  }
}
