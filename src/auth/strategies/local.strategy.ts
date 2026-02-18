import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { LocalRequest } from '../types/requests';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'senha',
    });
  }

  async validate(email: string, senha: string): Promise<LocalRequest> {
    const user = await this.authService.validarUsuario(email, senha);

    if (!user) {
      throw new UnauthorizedException('Usuário ou senha inválidos');
    }

    return user;
  }
}
