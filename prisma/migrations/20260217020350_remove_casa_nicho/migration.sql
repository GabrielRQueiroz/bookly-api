/*
  Warnings:

  - You are about to drop the column `nichoId` on the `Livro` table. All the data in the column will be lost.
  - You are about to drop the `Casa` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CasaUsuario` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Nicho` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CasaUsuario" DROP CONSTRAINT "CasaUsuario_casaId_fkey";

-- DropForeignKey
ALTER TABLE "CasaUsuario" DROP CONSTRAINT "CasaUsuario_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "Estante" DROP CONSTRAINT "Estante_casaId_fkey";

-- DropForeignKey
ALTER TABLE "Livro" DROP CONSTRAINT "Livro_casaId_fkey";

-- DropForeignKey
ALTER TABLE "Livro" DROP CONSTRAINT "Livro_nichoId_fkey";

-- DropForeignKey
ALTER TABLE "Nicho" DROP CONSTRAINT "Nicho_estanteId_fkey";

-- DropIndex
DROP INDEX "Livro_nichoId_casaId_idx";

-- AlterTable
ALTER TABLE "Livro" DROP COLUMN "nichoId";

-- DropTable
DROP TABLE "Casa";

-- DropTable
DROP TABLE "CasaUsuario";

-- DropTable
DROP TABLE "Nicho";

-- CreateTable
CREATE TABLE "LivroEstante" (
    "id" SERIAL NOT NULL,
    "livroId" INTEGER NOT NULL,
    "estanteId" INTEGER NOT NULL,
    "coluna" INTEGER NOT NULL,
    "linha" INTEGER NOT NULL,

    CONSTRAINT "LivroEstante_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LivroEstante_livroId_estanteId_key" ON "LivroEstante"("livroId", "estanteId");

-- CreateIndex
CREATE INDEX "Livro_casaId_editoraId_idx" ON "Livro"("casaId", "editoraId");

-- AddForeignKey
ALTER TABLE "LivroEstante" ADD CONSTRAINT "LivroEstante_livroId_fkey" FOREIGN KEY ("livroId") REFERENCES "Livro"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LivroEstante" ADD CONSTRAINT "LivroEstante_estanteId_fkey" FOREIGN KEY ("estanteId") REFERENCES "Estante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
