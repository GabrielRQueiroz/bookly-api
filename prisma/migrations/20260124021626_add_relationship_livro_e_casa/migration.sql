/*
  Warnings:

  - Added the required column `casaId` to the `Livro` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Livro" ADD COLUMN     "casaId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Livro" ADD CONSTRAINT "Livro_casaId_fkey" FOREIGN KEY ("casaId") REFERENCES "Casa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
