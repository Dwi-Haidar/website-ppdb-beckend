/*
  Warnings:

  - You are about to drop the column `image` on the `Ppdb` table. All the data in the column will be lost.
  - Added the required column `images` to the `Ppdb` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ppdb" DROP COLUMN "image",
ADD COLUMN     "images" TEXT NOT NULL;
