import { Inject, Injectable } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Usuario } from 'generated/prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import refreshConfig from './config/refresh.config';
import { JwtPayload } from './types/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    @Inject(refreshConfig.KEY)
    private readonly refreshTokenConfig: ConfigType<typeof refreshConfig>,
  ) {}
  private async gerarTokens(usuarioId: string, email: string) {
    const payload: JwtPayload = { sub: usuarioId, email };

    const access_token = this.jwt.sign(payload);

    const refresh_token = this.jwt.sign(payload, this.refreshTokenConfig);

    return { access_token, refresh_token };
  }

  async validarUsuario(
    email: string,
    senha: string,
  ): Promise<Omit<Usuario, 'senha'> | null> {
    const user = await this.prisma.usuario.findUnique({
      where: { email },
    });

    if (user && (await bcrypt.compare(senha, user.senha))) {
      const { senha, ...result } = user;
      return result;
    }

    return null;
  }

  async registrar(nome: string, email: string, senha: string) {
    const hash = await bcrypt.hash(senha, 10);

    const usuario = await this.prisma.usuario.create({
      data: { nome, email, senha: hash },
    });

    const { access_token, refresh_token } = await this.gerarTokens(
      usuario.id,
      usuario.email,
    );

    return { access_token, refresh_token };
  }

  async login(usuario: Omit<Usuario, 'senha'>) {
    const { access_token, refresh_token } = await this.gerarTokens(
      usuario.id,
      usuario.email,
    );

    return { access_token, refresh_token };
  }

  async reautenticar(usuario: Omit<Usuario, 'senha'>) {
    const payload: JwtPayload = { sub: usuario.id, email: usuario.email };

    const access_token = this.jwt.sign(payload);

    return { access_token };
  }
}
