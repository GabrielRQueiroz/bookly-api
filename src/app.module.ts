import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AutorModule } from './autor/autor.module';
import { EditoraModule } from './editora/editora.module';
import { EstanteModule } from './estante/estante.module';
import { GeneroModule } from './genero/genero.module';
import { LivroModule } from './livro/livro.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { UsuariosModule } from './usuarios/usuarios.module';

@Module({
  imports: [
    LivroModule,
    AutorModule,
    EditoraModule,
    GeneroModule,
    EstanteModule,
    AuthModule,
    UsuariosModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
