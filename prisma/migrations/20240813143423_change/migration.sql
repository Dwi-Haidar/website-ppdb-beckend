/*
  Warnings:

  - You are about to drop the column `nisn` on the `Kelulusan` table. All the data in the column will be lost.
  - You are about to drop the column `tahunKelulusan` on the `Kelulusan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Kelulusan" DROP COLUMN "nisn",
DROP COLUMN "tahunKelulusan";
