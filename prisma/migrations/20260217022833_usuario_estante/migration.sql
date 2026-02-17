-- CreateEnum
CREATE TYPE "EstanteCargo" AS ENUM ('DONO', 'MEMBRO');

-- DropEnum
DROP TYPE "CasaCargo";

-- CreateTable
CREATE TABLE "EstanteUsuario" (
    "id" SERIAL NOT NULL,
    "estanteId" INTEGER NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "estanteCargo" "EstanteCargo" NOT NULL DEFAULT 'MEMBRO',

    CONSTRAINT "EstanteUsuario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EstanteUsuario_estanteId_usuarioId_key" ON "EstanteUsuario"("estanteId", "usuarioId");

-- AddForeignKey
ALTER TABLE "EstanteUsuario" ADD CONSTRAINT "EstanteUsuario_estanteId_fkey" FOREIGN KEY ("estanteId") REFERENCES "Estante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EstanteUsuario" ADD CONSTRAINT "EstanteUsuario_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
