/*
  Warnings:

  - Added the required column `comment` to the `Visit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Visit" ADD COLUMN     "comment" TEXT NOT NULL;
