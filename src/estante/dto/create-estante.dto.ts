import { IsInt, Min } from 'class-validator';

export class CreateEstanteDto {
  nome: string;

  @IsInt()
  @Min(1)
  linhas: number;

  @IsInt()
  @Min(1)
  colunas: number;
}
