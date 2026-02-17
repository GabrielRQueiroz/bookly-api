-- CreateEnum
CREATE TYPE "Cargo" AS ENUM ('DONO', 'MEMBRO');

-- AlterTable
ALTER TABLE "CasaUsuario" ADD COLUMN     "casaCargo" "Cargo" NOT NULL DEFAULT 'MEMBRO';
