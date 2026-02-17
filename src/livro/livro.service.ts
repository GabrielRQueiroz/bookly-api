import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLivroDto } from './dto/create-livro.dto';
import { UpdateLivroDto } from './dto/update-livro.dto';

@Injectable()
export class LivroService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createLivroDto: CreateLivroDto) {
    return this.prisma.livro.create({
      data: {
        titulo: createLivroDto.titulo,
        capaUrl: createLivroDto.capaUrl,
        editora: { connect: { id: createLivroDto.editoraId } },
        autores: {
          connect: createLivroDto.autorIds.map((id) => ({ id })),
        },
        generos: {
          connect: createLivroDto.generoIds?.map((id) => ({ id })) || [],
        },
        formato: createLivroDto.formato,
        status: createLivroDto.status,
      },
    });
  }

  async findAll(query: any) {
    return this.prisma.livro.findMany({
      where: {
        titulo: query.titulo
          ? { contains: query.titulo, mode: 'insensitive' }
          : undefined,
        editoraId: query.editoraId ? Number(query.editoraId) : undefined,
        autores: query.autorId
          ? {
              some: {
                id: Number(query.autorId),
              },
            }
          : undefined,
        generos: query.generoId
          ? {
              some: {
                id: Number(query.generoId),
              },
            }
          : undefined,
      },
      include: {
        autores: true,
        generos: true,
        editora: true,
      },
    });
  }

  async findOne(id: number) {
    const livro = await this.prisma.livro.findUnique({
      where: { id },
      include: {
        autores: true,
        generos: true,
        editora: true,
      },
    });

    if (!livro) {
      throw new NotFoundException('Livro não encontrado');
    }

    return livro;
  }

  async update(id: number, updateLivroDto: UpdateLivroDto) {
    await this.findOne(id);

    return this.prisma.livro.update({
      where: { id },
      data: {
        titulo: updateLivroDto.titulo,
        capaUrl: updateLivroDto.capaUrl,
        editora: updateLivroDto.editoraId
          ? { connect: { id: updateLivroDto.editoraId } }
          : undefined,
        autores: updateLivroDto.autorIds
          ? { set: updateLivroDto.autorIds.map((id) => ({ id })) }
          : undefined,
        generos: updateLivroDto.generoIds
          ? { set: updateLivroDto.generoIds.map((id) => ({ id })) }
          : undefined,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.livro.delete({
      where: { id },
    });
  }
}
