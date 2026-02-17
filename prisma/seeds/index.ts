import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from 'bcrypt';
import { PrismaClient } from 'generated/prisma/client';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  /*
    =========================
    AUTORES
    =========================
  */
  await prisma.autor.createMany({
    data: [
      { id: 1, nomeComum: 'J.K. Rowling' },
      { id: 2, nomeComum: 'George R.R. Martin' },
      { id: 3, nomeComum: 'J.R.R. Tolkien' },
      { id: 4, nomeComum: 'Agatha Christie' },
      { id: 5, nomeComum: 'Stephen King' },
      { id: 6, nomeComum: 'Isaac Asimov' },
      { id: 7, nomeComum: 'Robert C. Martin' },
      { id: 8, nomeComum: 'Frederick P. Brooks Jr.' },
      { id: 9, nomeComum: 'Martin Fowler' },
      { id: 10, nomeComum: 'Kent Beck' },
      { id: 11, nomeComum: 'Brad Smith' },
      { id: 12, nomeComum: 'Douglas Adams' },
      { id: 13, nomeComum: 'George Orwell' },
      { id: 14, nomeComum: 'Brandon Sanderson' },
    ],
    skipDuplicates: true,
  });

  /*
    =========================
    EDITORAS
    =========================
  */
  await prisma.editora.createMany({
    data: [
      { id: 1, nome: 'Editora A' },
      { id: 2, nome: 'Editora B' },
      { id: 3, nome: 'Editora C' },
      { id: 4, nome: 'Editora D' },
      { id: 5, nome: 'Editora E' },
    ],
    skipDuplicates: true,
  });

  /*
    =========================
    GÊNEROS
    =========================
  */
  await prisma.genero.createMany({
    data: [
      { id: 1, nome: 'Ficção Científica', corHexa: '#33C1FF' },
      { id: 2, nome: 'Fantasia', corHexa: '#FFC133' },
      { id: 3, nome: 'Mistério', corHexa: '#FF33A1' },
      { id: 4, nome: 'Romance', corHexa: '#FF3366' },
      { id: 5, nome: 'Biografia', corHexa: '#33FF99' },
      { id: 6, nome: 'História', corHexa: '#FF9933' },
      { id: 7, nome: 'Terror', corHexa: '#FF3333' },
      { id: 8, nome: 'Suspense', corHexa: '#6666FF' },
      { id: 9, nome: 'Programação', corHexa: '#33FF57' },
    ],
    skipDuplicates: true,
  });

  /*
    =========================
    USUÁRIOS
    =========================
  */

  const senhaHash = await bcrypt.hash('123456', 10);

  await prisma.usuario.createMany({
    data: [
      {
        id: '1',
        nome: 'Alice',
        email: 'alice@example.com',
        senha: senhaHash,
        avatarUrl: '',
      },
      {
        id: '2',
        nome: 'Bob',
        email: 'bob@example.com',
        senha: senhaHash,
        avatarUrl: '',
      },
      {
        id: '3',
        nome: 'Charlie',
        email: 'charlie@example.com',
        senha: senhaHash,
        avatarUrl: '',
      },
      {
        id: '4',
        nome: 'Diana',
        email: 'diana@example.com',
        senha: senhaHash,
        avatarUrl: '',
      },
      {
        id: '5',
        nome: 'Eve',
        email: 'eve@example.com',
        senha: senhaHash,
        avatarUrl: '',
      },
    ],
    skipDuplicates: true,
  });

  /*
    =========================
    ESTANTES
    =========================
  */

  await prisma.estante.createMany({
    data: [
      { id: 1, nome: 'Estante da Sala', linhas: 2, colunas: 4 },
      { id: 2, nome: 'Estante da Cozinha', linhas: 2, colunas: 4 },
    ],
    skipDuplicates: true,
  });

  /*
    =========================
    RELAÇÃO USUARIO-ESTANTE
    =========================
  */

  await prisma.estanteUsuario.createMany({
    data: [
      { estanteId: 1, usuarioId: '1', cargo: 'DONO' },
      { estanteId: 1, usuarioId: '2', cargo: 'MEMBRO' },
      { estanteId: 1, usuarioId: '3', cargo: 'MEMBRO' },
      { estanteId: 1, usuarioId: '4', cargo: 'MEMBRO' },
      { estanteId: 1, usuarioId: '5', cargo: 'MEMBRO' },
      { estanteId: 2, usuarioId: '2', cargo: 'DONO' },
      { estanteId: 2, usuarioId: '1', cargo: 'MEMBRO' },
    ],
    skipDuplicates: true,
  });

  /*
    =========================
    LIVROS
    =========================
  */

  await prisma.livro.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      titulo: 'Clean Code',
      editoraId: 1,
      autores: {
        connect: [{ id: 7 }],
      },
      generos: {
        connect: [{ id: 9 }],
      },
      livroEstantes: {
        create: {
          estanteId: 1,
          linha: 4,
          coluna: 2,
        },
      },
    },
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
