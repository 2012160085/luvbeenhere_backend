/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Tag` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `WeatherTag` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Tag.name_unique" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "WeatherTag.name_unique" ON "WeatherTag"("name");
