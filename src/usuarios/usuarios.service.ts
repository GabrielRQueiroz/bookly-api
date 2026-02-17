import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsuariosService {
  constructor(private readonly prisma: PrismaService) {}

  async findOneById(id: string) {
    return this.prisma.usuario.findUnique({ where: { id } });
  }
  
  async findOneByEmail(email: string) {
    return this.prisma.usuario.findUnique({ where: { email } });
  }
}
