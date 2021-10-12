/*
  Warnings:

  - You are about to drop the `Date` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_DateToTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_DateToWeatherTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Date" DROP CONSTRAINT "Date_coupleId_fkey";

-- DropForeignKey
ALTER TABLE "_DateToTag" DROP CONSTRAINT "_DateToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_DateToTag" DROP CONSTRAINT "_DateToTag_B_fkey";

-- DropForeignKey
ALTER TABLE "_DateToWeatherTag" DROP CONSTRAINT "_DateToWeatherTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_DateToWeatherTag" DROP CONSTRAINT "_DateToWeatherTag_B_fkey";

-- DropForeignKey
ALTER TABLE "Visit" DROP CONSTRAINT "Visit_dateId_fkey";

-- DropTable
DROP TABLE "Date";

-- DropTable
DROP TABLE "_DateToTag";

-- DropTable
DROP TABLE "_DateToWeatherTag";

-- CreateTable
CREATE TABLE "MDate" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "datetime" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "coupleId" INTEGER NOT NULL,
    "posX" DOUBLE PRECISION,
    "posY" DOUBLE PRECISION,
    "price" INTEGER,
    "isPublic" BOOLEAN DEFAULT false,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MDateToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_MDateToWeatherTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "MDate.datetime_coupleId_unique" ON "MDate"("datetime", "coupleId");

-- CreateIndex
CREATE UNIQUE INDEX "_MDateToTag_AB_unique" ON "_MDateToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_MDateToTag_B_index" ON "_MDateToTag"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MDateToWeatherTag_AB_unique" ON "_MDateToWeatherTag"("A", "B");

-- CreateIndex
CREATE INDEX "_MDateToWeatherTag_B_index" ON "_MDateToWeatherTag"("B");

-- AddForeignKey
ALTER TABLE "MDate" ADD FOREIGN KEY ("coupleId") REFERENCES "Couple"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MDateToTag" ADD FOREIGN KEY ("A") REFERENCES "MDate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MDateToTag" ADD FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MDateToWeatherTag" ADD FOREIGN KEY ("A") REFERENCES "MDate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MDateToWeatherTag" ADD FOREIGN KEY ("B") REFERENCES "WeatherTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visit" ADD FOREIGN KEY ("dateId") REFERENCES "MDate"("id") ON DELETE CASCADE ON UPDATE CASCADE;
