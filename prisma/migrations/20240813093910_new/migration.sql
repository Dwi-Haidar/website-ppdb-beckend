/*
  Warnings:

  - A unique constraint covering the columns `[noKK]` on the table `Ppdb` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Ppdb" ALTER COLUMN "nisn" SET DATA TYPE BIGINT,
ALTER COLUMN "nik" SET DATA TYPE BIGINT,
ALTER COLUMN "noKK" SET DATA TYPE BIGINT;

-- CreateIndex
CREATE UNIQUE INDEX "Ppdb_noKK_key" ON "Ppdb"("noKK");
