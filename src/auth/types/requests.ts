import { Usuario } from 'generated/prisma/client';

export type UserRequest = {
  email: string;
  id: string;
};

export type LocalRequest = Omit<Usuario, 'senha'>;
