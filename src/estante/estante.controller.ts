import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  UsuarioAtivo,
  type Usuario,
} from 'src/common/decorators/usuario-ativo.decorator';
import { CreateEstanteDto } from './dto/create-estante.dto';
import { UpdateEstanteDto } from './dto/update-estante.dto';
import { EstanteService } from './estante.service';

@Controller('estante')
export class EstanteController {
  constructor(private readonly estanteService: EstanteService) {}

  @Post()
  create(
    @Body() createEstanteDto: CreateEstanteDto,
    @UsuarioAtivo() usuario: Usuario,
  ) {
    return this.estanteService.create(createEstanteDto, usuario.id);
  }

  @Get()
  findAll(@UsuarioAtivo() usuario: Usuario) {
    return this.estanteService.findAll(usuario.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @UsuarioAtivo() usuario: Usuario) {
    return this.estanteService.findOne(+id, usuario.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEstanteDto: UpdateEstanteDto,
    @UsuarioAtivo() usuario: Usuario,
  ) {
    return this.estanteService.update(+id, updateEstanteDto, usuario.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @UsuarioAtivo() usuario: Usuario) {
    return this.estanteService.remove(+id, usuario.id);
  }
}
