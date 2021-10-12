/*
  Warnings:

  - You are about to drop the column `yyyymmdd` on the `Date` table. All the data in the column will be lost.
  - Added the required column `datetime` to the `Date` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Date" DROP COLUMN "yyyymmdd",
ADD COLUMN     "datetime" TIMESTAMP(3) NOT NULL;
