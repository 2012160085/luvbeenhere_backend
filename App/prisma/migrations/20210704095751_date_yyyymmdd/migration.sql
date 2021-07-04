/*
  Warnings:

  - You are about to drop the column `datetime` on the `Date` table. All the data in the column will be lost.
  - Added the required column `yyyymmdd` to the `Date` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Date" DROP COLUMN "datetime",
ADD COLUMN     "yyyymmdd" TEXT NOT NULL;
