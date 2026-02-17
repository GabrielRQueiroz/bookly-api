-- CreateTable
CREATE TABLE "Livro" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "anoPublicacao" INTEGER NOT NULL,
    "capaUrl" TEXT,
    "editoraId" INTEGER NOT NULL,
    "nichoId" INTEGER NOT NULL,

    CONSTRAINT "Livro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Autor" (
    "id" SERIAL NOT NULL,
    "nomeComum" TEXT NOT NULL,
    "nomeCompleto" TEXT NOT NULL,

    CONSTRAINT "Autor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Genero" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Genero_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Editora" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Editora_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Estante" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Estante_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Nicho" (
    "id" SERIAL NOT NULL,
    "fileira" INTEGER NOT NULL,
    "coluna" INTEGER NOT NULL,
    "estanteId" INTEGER NOT NULL,

    CONSTRAINT "Nicho_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_LivroAutores" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_LivroAutores_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_LivroGeneros" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_LivroGeneros_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Autor_nomeComum_key" ON "Autor"("nomeComum");

-- CreateIndex
CREATE UNIQUE INDEX "Genero_nome_key" ON "Genero"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Editora_nome_key" ON "Editora"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Estante_nome_key" ON "Estante"("nome");

-- CreateIndex
CREATE INDEX "_LivroAutores_B_index" ON "_LivroAutores"("B");

-- CreateIndex
CREATE INDEX "_LivroGeneros_B_index" ON "_LivroGeneros"("B");

-- AddForeignKey
ALTER TABLE "Livro" ADD CONSTRAINT "Livro_editoraId_fkey" FOREIGN KEY ("editoraId") REFERENCES "Editora"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Livro" ADD CONSTRAINT "Livro_nichoId_fkey" FOREIGN KEY ("nichoId") REFERENCES "Nicho"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nicho" ADD CONSTRAINT "Nicho_estanteId_fkey" FOREIGN KEY ("estanteId") REFERENCES "Estante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LivroAutores" ADD CONSTRAINT "_LivroAutores_A_fkey" FOREIGN KEY ("A") REFERENCES "Autor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LivroAutores" ADD CONSTRAINT "_LivroAutores_B_fkey" FOREIGN KEY ("B") REFERENCES "Livro"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LivroGeneros" ADD CONSTRAINT "_LivroGeneros_A_fkey" FOREIGN KEY ("A") REFERENCES "Genero"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LivroGeneros" ADD CONSTRAINT "_LivroGeneros_B_fkey" FOREIGN KEY ("B") REFERENCES "Livro"("id") ON DELETE CASCADE ON UPDATE CASCADE;
