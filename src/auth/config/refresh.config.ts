import { registerAs } from '@nestjs/config';
import { JwtSignOptions } from '@nestjs/jwt';
import type { StringValue } from 'ms';

export default registerAs(
  'refresh',
  (): JwtSignOptions => ({
    secret: process.env.REFRESH_SECRET,
    expiresIn: (process.env.REFRESH_EXPIRES_IN as StringValue) || '30d',
  }),
);
