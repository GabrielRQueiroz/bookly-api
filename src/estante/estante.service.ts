import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Usuario } from 'src/common/decorators/usuario-ativo.decorator';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEstanteDto } from './dto/create-estante.dto';
import { UpdateEstanteDto } from './dto/update-estante.dto';

@Injectable()
export class EstanteService {
  constructor(private readonly prisma: PrismaService) {}

  create(createEstanteDto: CreateEstanteDto, usuarioId: Usuario['id']) {
    return this.prisma.estante.create({
      data: {
        nome: createEstanteDto.nome,
        colunas: createEstanteDto.colunas,
        linhas: createEstanteDto.linhas,
        usuarios: {
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
    const dono = await this.prisma.estante.findMany({
      include: {
        usuarios: {
          select: {
            cargo: true,
            usuario: {
              select: { nome: true },
            },
          },
        },
      },
      where: {
        usuarios: {
          some: {
            usuarioId: usuarioId,
            cargo: 'DONO',
          },
        },
      },
    });
    const convidado = await this.prisma.estante.findMany({
      include: {
        usuarios: {
          select: {
            cargo: true,
            usuario: {
              select: { nome: true },
            },
          },
        },
      },
      where: {
        usuarios: {
          some: {
            usuarioId: usuarioId,
            cargo: 'MEMBRO',
          },
        },
      },
    });
    const result = {
      dono: dono.map((estante) => ({
        ...estante,
        usuarios: estante.usuarios.map((relacao) => ({
          cargo: relacao.cargo,
          nome: relacao.usuario.nome,
        })),
      })),
      convidado: convidado.map((estante) => ({
        ...estante,
        usuarios: estante.usuarios.map((relacao) => ({
          cargo: relacao.cargo,
          nome: relacao.usuario.nome,
        })),
      })),
    };
    return result;
  }

  async findOne(id: number, usuarioId: Usuario['id']) {
    const estante = await this.prisma.estante.findFirst({
      include: {
        livros: {
          include: {
            livro: true,
          }
        },
        usuarios: {
          include: {
            usuario: {
              omit: {
                senha: true,
              },
            },
          },
        },
      },
      where: {
        id: id,
        usuarios: {
          some: {
            usuarioId: usuarioId,
          },
        },
      },
    });

    if (!estante) {
      throw new NotFoundException('Estante não encontrada');
    }

    return {
      ...estante,
      livros: estante.livros.map((relacao) => ({
        ...relacao.livro,
        linha: relacao.linha,
        coluna: relacao.coluna,
      })),
      usuarios: estante.usuarios.map((relacao) => ({
        cargo: relacao.cargo,
        ...relacao.usuario,
      })),
    };
  }

  async listLivros(id: number, usuarioId: Usuario['id']) {
    const estante = await this.prisma.estante.findFirst({
      include: {
        livros: {
          include: {
            livro: true,
          }
        },
        usuarios: {
          include: {
            usuario: {
              omit: {
                senha: true,
              },
            },
          },
        },
      },
      where: {
        id: id,
        usuarios: {
          some: {
            usuarioId: usuarioId,
          },
        },
      },
    });

    if (!estante) {
      throw new NotFoundException('Estante não encontrada');
    }

    return estante.livros.map((relacao) => ({
      ...relacao.livro,
      linha: relacao.linha,
      coluna: relacao.coluna,
    }));
  }

  async listUsuarios(id: number, usuarioId: Usuario['id']) {
    const estante = await this.prisma.estante.findFirst({
      include: {
        usuarios: {
          include: {
            usuario: {
              omit: {
                senha: true,
              },
            },
          },
        },
      },
      where: {
        id: id,
        usuarios: {
          some: {
            usuarioId: usuarioId,
          },
        },
      },
    });

    if (!estante) {
      throw new NotFoundException('Estante não encontrada');
    }

    return estante.usuarios.map((relacao) => ({
      cargo: relacao.cargo,
      ...relacao.usuario,
    }));
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
        usuarios: {
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
        usuarios: {
          some: {
            usuarioId: usuarioId,
            cargo: 'DONO',
          },
        },
      },
    });
  }
}
