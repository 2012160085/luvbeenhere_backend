/*
  Warnings:

  - Added the required column `name` to the `Couple` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Couple" ADD COLUMN     "name" TEXT NOT NULL;
