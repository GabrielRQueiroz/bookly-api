import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { Formato, StatusLivro } from 'generated/prisma/enums';

export class CreateLivroDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsUrl()
  @IsOptional()
  capaUrl?: string;

  @IsArray()
  @ArrayNotEmpty()
  autorIds: number[];

  @IsInt()
  @IsNotEmpty()
  editoraId: number;

  @IsArray()
  @IsOptional()
  generoIds?: number[];

  @IsArray()
  @IsOptional()
  nichoId?: number;

  @IsOptional()
  formato?: Formato;

  @IsOptional()
  status?: StatusLivro;
}
