/*
  Warnings:

  - A unique constraint covering the columns `[weatherStationId,observedAt]` on the table `Weather` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Weather.weatherStationId_observedAt_unique" ON "Weather"("weatherStationId", "observedAt");
