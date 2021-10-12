-- AlterTable
ALTER TABLE "Date" ADD COLUMN     "isPublic" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Visit" ADD COLUMN     "isPublic" BOOLEAN NOT NULL DEFAULT false;
