-- CreateTable
CREATE TABLE "Kelulusan" (
    "id" SERIAL NOT NULL,
    "nisn" TEXT NOT NULL,
    "tahunKelulusan" INTEGER NOT NULL,
    "statusKelulusan" TEXT NOT NULL,
    "ppdbId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Kelulusan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Kelulusan_ppdbId_key" ON "Kelulusan"("ppdbId");

-- AddForeignKey
ALTER TABLE "Kelulusan" ADD CONSTRAINT "Kelulusan_ppdbId_fkey" FOREIGN KEY ("ppdbId") REFERENCES "Ppdb"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
