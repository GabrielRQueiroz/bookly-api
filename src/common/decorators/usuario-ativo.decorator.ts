import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export type Usuario = {
  id: string;
  email: string;
};

export const UsuarioAtivo = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): Usuario => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
