/*
  Warnings:

  - The primary key for the `EstanteUsuario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `EstanteUsuario` table. All the data in the column will be lost.
  - The primary key for the `LivroEstante` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `LivroEstante` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "EstanteUsuario_estanteId_usuarioId_key";

-- DropIndex
DROP INDEX "LivroEstante_livroId_estanteId_key";

-- AlterTable
ALTER TABLE "EstanteUsuario" DROP CONSTRAINT "EstanteUsuario_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "EstanteUsuario_pkey" PRIMARY KEY ("estanteId", "usuarioId");

-- AlterTable
ALTER TABLE "LivroEstante" DROP CONSTRAINT "LivroEstante_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "LivroEstante_pkey" PRIMARY KEY ("livroId", "estanteId");
