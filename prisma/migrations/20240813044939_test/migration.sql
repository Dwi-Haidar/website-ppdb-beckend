/*
  Warnings:

  - Changed the type of `nisn` on the `Ppdb` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `nik` on the `Ppdb` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `noKK` on the `Ppdb` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Ppdb" DROP COLUMN "nisn",
ADD COLUMN     "nisn" INTEGER NOT NULL,
DROP COLUMN "nik",
ADD COLUMN     "nik" INTEGER NOT NULL,
DROP COLUMN "noKK",
ADD COLUMN     "noKK" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Ppdb_nisn_key" ON "Ppdb"("nisn");

-- CreateIndex
CREATE UNIQUE INDEX "Ppdb_nik_key" ON "Ppdb"("nik");

-- CreateIndex
CREATE INDEX "Ppdb_nisn_idx" ON "Ppdb"("nisn");

-- CreateIndex
CREATE INDEX "Ppdb_nik_idx" ON "Ppdb"("nik");
