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
-- DropIndex
DROP INDEX "CoupleInvitation_senderId_receiverId_key";

-- DropIndex
DROP INDEX "MDate_datetime_coupleId_key";

-- DropIndex
DROP INDEX "Rating_visitId_key";

-- DropIndex
DROP INDEX "Tag_name_key";

-- DropIndex
DROP INDEX "User_phone_key";

-- DropIndex
DROP INDEX "User_username_key";

-- DropIndex
DROP INDEX "Visit_posX_posY_idx";

-- DropIndex
DROP INDEX "Weather_observedAt_idx";

-- DropIndex
DROP INDEX "Weather_weatherStationId_observedAt_key";

-- DropIndex
DROP INDEX "WeatherTag_name_key";

-- DropIndex
DROP INDEX "_MDateToTag_AB_unique";

-- DropIndex
DROP INDEX "_MDateToTag_B_index";

-- DropIndex
DROP INDEX "_MDateToWeatherTag_AB_unique";

-- DropIndex
DROP INDEX "_MDateToWeatherTag_B_index";

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
