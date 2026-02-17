/*
  Warnings:

  - Added the required column `casaId` to the `Estante` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cadastradoPorId` to the `Livro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `casaId` to the `Livro` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Livro" DROP CONSTRAINT "Livro_nichoId_fkey";

-- AlterTable
ALTER TABLE "Estante" ADD COLUMN     "casaId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Livro" ADD COLUMN     "cadastradoPorId" INTEGER NOT NULL,
ADD COLUMN     "casaId" INTEGER NOT NULL,
ALTER COLUMN "nichoId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "nome" TEXT,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Casa" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Casa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CasaUsuario" (
    "casaId" INTEGER NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "papel" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "CasaUsuario_casaId_usuarioId_key" ON "CasaUsuario"("casaId", "usuarioId");

-- AddForeignKey
ALTER TABLE "Livro" ADD CONSTRAINT "Livro_casaId_fkey" FOREIGN KEY ("casaId") REFERENCES "Casa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Livro" ADD CONSTRAINT "Livro_nichoId_fkey" FOREIGN KEY ("nichoId") REFERENCES "Nicho"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Livro" ADD CONSTRAINT "Livro_cadastradoPorId_fkey" FOREIGN KEY ("cadastradoPorId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Estante" ADD CONSTRAINT "Estante_casaId_fkey" FOREIGN KEY ("casaId") REFERENCES "Casa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CasaUsuario" ADD CONSTRAINT "CasaUsuario_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CasaUsuario" ADD CONSTRAINT "CasaUsuario_casaId_fkey" FOREIGN KEY ("casaId") REFERENCES "Casa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
