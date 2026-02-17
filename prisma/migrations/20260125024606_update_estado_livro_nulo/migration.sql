/*
  Warnings:

  - Made the column `formato` on table `Livro` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Livro" ALTER COLUMN "formato" SET NOT NULL,
ALTER COLUMN "status" DROP NOT NULL,
ALTER COLUMN "status" DROP DEFAULT;
