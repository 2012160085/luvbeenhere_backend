/*
  Warnings:

  - Added the required column `rate` to the `Rating` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cardId` to the `Rating` table without a default value. This is not possible if the table is not empty.
  - Added the required column `placeId` to the `Rating` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateId` to the `Rating` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Rating" ADD COLUMN     "rate" INTEGER NOT NULL,
ADD COLUMN     "cardId" INTEGER NOT NULL,
ADD COLUMN     "placeId" INTEGER NOT NULL,
ADD COLUMN     "dateId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Rating" ADD FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD FOREIGN KEY ("dateId") REFERENCES "Date"("id") ON DELETE CASCADE ON UPDATE CASCADE;
