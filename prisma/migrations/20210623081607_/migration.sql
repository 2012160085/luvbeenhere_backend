/*
  Warnings:

  - Added the required column `title` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `file` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locateX` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locateY` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `placeId` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Date` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "desc" TEXT,
ADD COLUMN     "file" TEXT NOT NULL,
ADD COLUMN     "locateX" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "locateY" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "placeId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Date" ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "desc" TEXT;

-- AddForeignKey
ALTER TABLE "Card" ADD FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE CASCADE ON UPDATE CASCADE;
