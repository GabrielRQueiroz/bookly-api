/*
  Warnings:

  - You are about to drop the column `anoPublicacao` on the `Livro` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Formato" AS ENUM ('FISICO', 'DIGITAL');

-- CreateEnum
CREATE TYPE "StatusLivro" AS ENUM ('NA_ESTANTE', 'LENDO', 'EMPRESTADO');

-- AlterTable
ALTER TABLE "Autor" ADD COLUMN     "nacionalidade" TEXT;

-- AlterTable
ALTER TABLE "Livro" DROP COLUMN "anoPublicacao",
ADD COLUMN     "formato" "Formato" NOT NULL DEFAULT 'FISICO',
ADD COLUMN     "status" "StatusLivro" NOT NULL DEFAULT 'NA_ESTANTE';
