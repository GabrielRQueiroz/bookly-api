import { Module } from '@nestjs/common';
import { LivroController } from './livro.controller';
import { LivroService } from './livro.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [LivroController],
  providers: [LivroService],
})
export class LivroModule {}
