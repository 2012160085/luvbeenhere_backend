/*
  Warnings:

  - A unique constraint covering the columns `[datetime]` on the table `Date` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Date.datetime_unique" ON "Date"("datetime");
