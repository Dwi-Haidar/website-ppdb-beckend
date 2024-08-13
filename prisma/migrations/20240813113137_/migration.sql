/*
  Warnings:

  - A unique constraint covering the columns `[nisn]` on the table `Ppdb` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nik]` on the table `Ppdb` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[noKK]` on the table `Ppdb` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Ppdb_nisn_key" ON "Ppdb"("nisn");

-- CreateIndex
CREATE UNIQUE INDEX "Ppdb_nik_key" ON "Ppdb"("nik");

-- CreateIndex
CREATE UNIQUE INDEX "Ppdb_noKK_key" ON "Ppdb"("noKK");
