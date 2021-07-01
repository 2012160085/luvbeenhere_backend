/*
  Warnings:

  - A unique constraint covering the columns `[mainCardId]` on the table `Date` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Date" ADD COLUMN     "mainCardId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Date_mainCardId_unique" ON "Date"("mainCardId");

-- AddForeignKey
ALTER TABLE "Date" ADD FOREIGN KEY ("mainCardId") REFERENCES "Card"("id") ON DELETE SET NULL ON UPDATE CASCADE;
