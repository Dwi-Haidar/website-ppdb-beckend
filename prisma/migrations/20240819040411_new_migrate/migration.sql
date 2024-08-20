/*
  Warnings:

  - Added the required column `fotoMurid` to the `Ppdb` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ppdb" ADD COLUMN     "fotoMurid" TEXT NOT NULL;
