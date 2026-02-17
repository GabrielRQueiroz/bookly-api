/*
  Warnings:

  - You are about to drop the column `papel` on the `CasaUsuario` table. All the data in the column will be lost.
  - You are about to drop the column `cadastradoPorId` on the `Livro` table. All the data in the column will be lost.
  - You are about to drop the column `casaId` on the `Livro` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Livro" DROP CONSTRAINT "Livro_cadastradoPorId_fkey";

-- DropForeignKey
ALTER TABLE "Livro" DROP CONSTRAINT "Livro_casaId_fkey";

-- AlterTable
ALTER TABLE "CasaUsuario" DROP COLUMN "papel",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "CasaUsuario_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Livro" DROP COLUMN "cadastradoPorId",
DROP COLUMN "casaId";
