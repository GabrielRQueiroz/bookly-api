/*
  Warnings:

  - You are about to drop the column `casaId` on the `Livro` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Livro_casaId_editoraId_idx";

-- AlterTable
ALTER TABLE "Livro" DROP COLUMN "casaId";

-- CreateIndex
CREATE INDEX "Livro_titulo_idx" ON "Livro"("titulo");
