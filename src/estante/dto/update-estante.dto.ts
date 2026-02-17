import { PartialType } from '@nestjs/mapped-types';
import { CreateEstanteDto } from './create-estante.dto';

export class UpdateEstanteDto extends PartialType(CreateEstanteDto) {}
