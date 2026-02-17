import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsuariosService } from './usuarios.service';

@Module({
  exports: [UsuariosService],
  imports: [PrismaModule],
  providers: [UsuariosService],
})
export class UsuariosModule {}
