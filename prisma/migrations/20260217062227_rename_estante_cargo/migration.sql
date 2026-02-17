/*
  Warnings:

  - You are about to drop the column `estanteCargo` on the `EstanteUsuario` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "EstanteUsuario" DROP COLUMN "estanteCargo",
ADD COLUMN     "cargo" "EstanteCargo" NOT NULL DEFAULT 'MEMBRO';
