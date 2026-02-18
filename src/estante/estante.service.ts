import { ForbiddenException, Injectable } from '@nestjs/common';
import { Usuario } from 'generated/prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEstanteDto } from './dto/create-estante.dto';
import { UpdateEstanteDto } from './dto/update-estante.dto';

@Injectable()
export class EstanteService {
  constructor(private readonly prisma: PrismaService) {}

  create(createEstanteDto: CreateEstanteDto, usuarioId: Usuario['id']) {
    return this.prisma.estante.create({
      include: {
        estanteUsuarios: {
          include: {
            usuario: true,
          },
        },
      },
      data: {
        nome: createEstanteDto.nome,
        linhas: createEstanteDto.linhas,
        colunas: createEstanteDto.colunas,
        estanteUsuarios: {
          create: {
            cargo: 'DONO',
            usuario: {
              connect: {
                id: usuarioId,
              },
            },
          },
        },
      },
    });
  }

  async findAll(usuarioId: Usuario['id']) {
    return {
      dono: await this.prisma.estante.findMany({
        where: {
          estanteUsuarios: {
            some: {
              usuarioId: usuarioId,
              cargo: 'DONO',
            },
          },
        },
      }),
      convidado: await this.prisma.estante.findMany({
        where: {
          estanteUsuarios: {
            some: {
              usuarioId: usuarioId,
              cargo: 'MEMBRO',
            },
          },
        },
      }),
    };
  }

  findOne(id: number, usuarioId: Usuario['id']) {
    return this.prisma.estante.findFirst({
      where: {
        id: id,
        estanteUsuarios: {
          some: {
            usuarioId: usuarioId,
          },
        },
      },
    });
  }

  async update(
    id: number,
    updateEstanteDto: UpdateEstanteDto,
    usuarioId: Usuario['id'],
  ) {
    const relacao = await this.prisma.estanteUsuario.findFirst({
      where: {
        estanteId: id,
        usuarioId: usuarioId,
      },
    });

    if (relacao?.cargo !== 'DONO') {
      throw new ForbiddenException('Apenas o dono da estante pode editá-la');
    }

    return this.prisma.estante.updateMany({
      where: {
        id: id,
        estanteUsuarios: {
          some: {
            usuarioId: usuarioId,
            cargo: 'DONO',
          },
        },
      },
      data: {
        ...updateEstanteDto,
      },
    });
  }

  async remove(id: number, usuarioId: Usuario['id']) {
    const relacao = await this.prisma.estanteUsuario.findFirst({
      where: {
        estanteId: id,
        usuarioId: usuarioId,
      },
    });

    if (relacao?.cargo !== 'DONO') {
      throw new ForbiddenException('Apenas o dono da estante pode removê-la');
    }

    return this.prisma.estante.deleteMany({
      where: {
        id: id,
        estanteUsuarios: {
          some: {
            usuarioId: usuarioId,
            cargo: 'DONO',
          },
        },
      },
    });
  }
}
