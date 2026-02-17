import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'senha',
      passReqToCallback: true,
    });
  }

  async validate(req: any, email: string, senha: string) {
    const user = await this.authService.validarUsuario(email, senha);

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    req.usuario = user;
    return user;
  }
}
