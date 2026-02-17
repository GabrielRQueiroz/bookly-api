/*
  Warnings:

  - The `casaCargo` column on the `CasaUsuario` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "CasaCargo" AS ENUM ('DONO', 'MEMBRO');

-- AlterTable
ALTER TABLE "CasaUsuario" DROP COLUMN "casaCargo",
ADD COLUMN     "casaCargo" "CasaCargo" NOT NULL DEFAULT 'MEMBRO';

-- DropEnum
DROP TYPE "Cargo";
