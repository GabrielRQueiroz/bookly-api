export class ListLivrosQuery {
  titulo?: string;
  autorId?: number;
  generoId?: number;
  editoraId?: number;
  nichoId?: number;
  estanteId?: number;
  page: number = 1;
  limit: number = 10;
}
