import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import jwtConfig from '../config/jwt.config';
import { JwtPayload } from '../types/jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject(jwtConfig.KEY)
    private readonly jwtTokenConfig: ConfigType<typeof jwtConfig>,
    private readonly authService: AuthService,
  ) {
    const secret = jwtTokenConfig.secret;
    if (!secret) {
      throw new Error('JWT secret não foi definido na configuração');
    }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  async validate(payload: JwtPayload) {
    if (!(await this.authService.verificarExistenciaUsuario(payload.sub))) {
      throw new UnauthorizedException('JWT com conteúdo inválido');
    }

    return { id: payload.sub, email: payload.email };
  }
}
