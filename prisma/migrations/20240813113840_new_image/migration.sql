/*
  Warnings:

  - You are about to drop the column `image` on the `Ppdb` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Ppdb_nik_idx";

-- DropIndex
DROP INDEX "Ppdb_nisn_idx";

-- AlterTable
ALTER TABLE "Ppdb" DROP COLUMN "image";

-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "ppdbId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_ppdbId_fkey" FOREIGN KEY ("ppdbId") REFERENCES "Ppdb"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
