/*
  Warnings:

  - A unique constraint covering the columns `[datetime,coupleId]` on the table `Date` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Date.datetime_unique";

-- CreateIndex
CREATE UNIQUE INDEX "Date.datetime_coupleId_unique" ON "Date"("datetime", "coupleId");
