import { Module } from '@nestjs/common';
import { EstanteService } from './estante.service';
import { EstanteController } from './estante.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [EstanteController],
  providers: [EstanteService],
})
export class EstanteModule {}
