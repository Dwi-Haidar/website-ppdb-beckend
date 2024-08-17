/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Ppdb` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Ppdb` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ppdb" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "isPaid" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "orderId" TEXT NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "ppdbId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Order_orderId_key" ON "Order"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "Ppdb_email_key" ON "Ppdb"("email");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_ppdbId_fkey" FOREIGN KEY ("ppdbId") REFERENCES "Ppdb"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
