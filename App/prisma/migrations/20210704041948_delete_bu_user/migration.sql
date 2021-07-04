/*
  Warnings:

  - You are about to drop the `Card` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Date` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Place` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Rating` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_dateId_fkey";

-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_placeId_fkey";

-- DropForeignKey
ALTER TABLE "Date" DROP CONSTRAINT "Date_mainCardId_fkey";

-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_dateId_fkey";

-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_placeId_fkey";

-- DropTable
DROP TABLE "Card";

-- DropTable
DROP TABLE "Date";

-- DropTable
DROP TABLE "Place";

-- DropTable
DROP TABLE "Rating";
