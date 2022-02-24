/*
  Warnings:

  - A unique constraint covering the columns `[senderId,receiverId]` on the table `CoupleInvitation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[datetime,coupleId]` on the table `MDate` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[visitId]` on the table `Rating` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Tag` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[weatherStationId,observedAt]` on the table `Weather` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `WeatherTag` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[A,B]` on the table `_MDateToTag` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[A,B]` on the table `_MDateToWeatherTag` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "CoupleInvitation" DROP CONSTRAINT "CoupleInvitation_receiverId_fkey";

-- DropForeignKey
ALTER TABLE "CoupleInvitation" DROP CONSTRAINT "CoupleInvitation_senderId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_userId_fkey";

-- DropForeignKey
ALTER TABLE "MDate" DROP CONSTRAINT "MDate_coupleId_fkey";

-- DropForeignKey
ALTER TABLE "Photo" DROP CONSTRAINT "Photo_visitId_fkey";

-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_visitId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_coupleId_fkey";

-- DropForeignKey
ALTER TABLE "Visit" DROP CONSTRAINT "Visit_dateId_fkey";

-- DropForeignKey
ALTER TABLE "Visit" DROP CONSTRAINT "Visit_placeId_fkey";

-- DropForeignKey
ALTER TABLE "Weather" DROP CONSTRAINT "Weather_weatherStationId_fkey";

-- DropIndex
DROP INDEX "CoupleInvitation.senderId_receiverId_unique";

-- DropIndex
DROP INDEX "MDate.datetime_coupleId_unique";

-- DropIndex
DROP INDEX "Rating.visitId_unique";

-- DropIndex
DROP INDEX "Tag.name_unique";

-- DropIndex
DROP INDEX "User.phone_unique";

-- DropIndex
DROP INDEX "User.username_unique";

-- DropIndex
DROP INDEX "Visit.posX_posY_index";

-- DropIndex
DROP INDEX "Weather.observedAt_index";

-- DropIndex
DROP INDEX "Weather.weatherStationId_observedAt_unique";

-- DropIndex
DROP INDEX "WeatherTag.name_unique";

-- DropIndex
DROP INDEX "_MDateToTag_AB_unique";

-- DropIndex
DROP INDEX "_MDateToTag_B_index";

-- DropIndex
DROP INDEX "_MDateToWeatherTag_AB_unique";

-- DropIndex
DROP INDEX "_MDateToWeatherTag_B_index";

-- AlterTable
ALTER TABLE "Visit" ADD COLUMN     "area0" TEXT,
ADD COLUMN     "area1" TEXT,
ADD COLUMN     "area2" TEXT,
ADD COLUMN     "area3" TEXT,
ADD COLUMN     "area4" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "CoupleInvitation_senderId_receiverId_key" ON "CoupleInvitation"("senderId", "receiverId");

-- CreateIndex
CREATE UNIQUE INDEX "MDate_datetime_coupleId_key" ON "MDate"("datetime", "coupleId");

-- CreateIndex
CREATE UNIQUE INDEX "Rating_visitId_key" ON "Rating"("visitId");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE INDEX "Visit_posX_posY_idx" ON "Visit"("posX", "posY");

-- CreateIndex
CREATE INDEX "Visit_area1_idx" ON "Visit" USING HASH ("area1");

-- CreateIndex
CREATE INDEX "Visit_area2_idx" ON "Visit" USING HASH ("area2");

-- CreateIndex
CREATE INDEX "Weather_observedAt_idx" ON "Weather"("observedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Weather_weatherStationId_observedAt_key" ON "Weather"("weatherStationId", "observedAt");

-- CreateIndex
CREATE UNIQUE INDEX "WeatherTag_name_key" ON "WeatherTag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_MDateToTag_AB_unique" ON "_MDateToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_MDateToTag_B_index" ON "_MDateToTag"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MDateToWeatherTag_AB_unique" ON "_MDateToWeatherTag"("A", "B");

-- CreateIndex
CREATE INDEX "_MDateToWeatherTag_B_index" ON "_MDateToWeatherTag"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_coupleId_fkey" FOREIGN KEY ("coupleId") REFERENCES "Couple"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MDate" ADD CONSTRAINT "MDate_coupleId_fkey" FOREIGN KEY ("coupleId") REFERENCES "Couple"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_dateId_fkey" FOREIGN KEY ("dateId") REFERENCES "MDate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_visitId_fkey" FOREIGN KEY ("visitId") REFERENCES "Visit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_visitId_fkey" FOREIGN KEY ("visitId") REFERENCES "Visit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoupleInvitation" ADD CONSTRAINT "CoupleInvitation_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoupleInvitation" ADD CONSTRAINT "CoupleInvitation_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Weather" ADD CONSTRAINT "Weather_weatherStationId_fkey" FOREIGN KEY ("weatherStationId") REFERENCES "WeatherStation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
