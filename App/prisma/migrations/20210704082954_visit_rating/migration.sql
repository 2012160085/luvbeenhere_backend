/*
  Warnings:

  - A unique constraint covering the columns `[visitId]` on the table `Rating` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Rating_visitId_unique" ON "Rating"("visitId");
