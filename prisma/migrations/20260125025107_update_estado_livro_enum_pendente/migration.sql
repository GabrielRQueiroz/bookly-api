/*
  Warnings:

  - Made the column `status` on table `Livro` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
ALTER TYPE "StatusLivro" ADD VALUE 'PENDENTE';

-- AlterTable
ALTER TABLE "Livro" ALTER COLUMN "status" SET NOT NULL;
