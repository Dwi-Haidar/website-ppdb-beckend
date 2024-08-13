/*
  Warnings:

  - The `statusKelulusan` column on the `Kelulusan` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Kelulusan" DROP COLUMN "statusKelulusan",
ADD COLUMN     "statusKelulusan" BOOLEAN NOT NULL DEFAULT false;
