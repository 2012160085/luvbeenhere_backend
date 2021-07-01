/*
  Warnings:

  - Added the required column `dateId` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "dateId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Card" ADD FOREIGN KEY ("dateId") REFERENCES "Date"("id") ON DELETE CASCADE ON UPDATE CASCADE;
