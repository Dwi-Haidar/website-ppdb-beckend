-- DropIndex
DROP INDEX "Ppdb_nik_key";

-- DropIndex
DROP INDEX "Ppdb_nisn_key";

-- DropIndex
DROP INDEX "Ppdb_noKK_key";

-- AlterTable
ALTER TABLE "Ppdb" ALTER COLUMN "tahunLahirAyah" SET DATA TYPE TEXT,
ALTER COLUMN "tahunLahirIbu" SET DATA TYPE TEXT,
ALTER COLUMN "nisn" SET DATA TYPE TEXT,
ALTER COLUMN "nik" SET DATA TYPE TEXT,
ALTER COLUMN "noKK" SET DATA TYPE TEXT;
