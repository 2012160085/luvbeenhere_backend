/*
  Warnings:

  - Added the required column `coupleId` to the `Date` table without a default value. This is not possible if the table is not empty.
  - Added the required column `posX` to the `Date` table without a default value. This is not possible if the table is not empty.
  - Added the required column `posY` to the `Date` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Date` table without a default value. This is not possible if the table is not empty.
  - Added the required column `comment` to the `Photo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coupleId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `advantage` to the `Visit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shortage` to the `Visit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Visit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Date" ADD COLUMN     "coupleId" INTEGER NOT NULL,
ADD COLUMN     "posX" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "posY" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "price" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Photo" ADD COLUMN     "comment" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "coupleId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Visit" ADD COLUMN     "advantage" TEXT NOT NULL,
ADD COLUMN     "shortage" TEXT NOT NULL,
ADD COLUMN     "price" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Couple" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeatherTag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DateToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_DateToWeatherTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DateToTag_AB_unique" ON "_DateToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_DateToTag_B_index" ON "_DateToTag"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DateToWeatherTag_AB_unique" ON "_DateToWeatherTag"("A", "B");

-- CreateIndex
CREATE INDEX "_DateToWeatherTag_B_index" ON "_DateToWeatherTag"("B");

-- AddForeignKey
ALTER TABLE "_DateToTag" ADD FOREIGN KEY ("A") REFERENCES "Date"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DateToTag" ADD FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DateToWeatherTag" ADD FOREIGN KEY ("A") REFERENCES "Date"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DateToWeatherTag" ADD FOREIGN KEY ("B") REFERENCES "WeatherTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Date" ADD FOREIGN KEY ("coupleId") REFERENCES "Couple"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD FOREIGN KEY ("coupleId") REFERENCES "Couple"("id") ON DELETE CASCADE ON UPDATE CASCADE;
