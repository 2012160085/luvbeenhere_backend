-- AlterTable
ALTER TABLE "Visit" ADD COLUMN     "weatherId" INTEGER;

-- AddForeignKey
ALTER TABLE "Visit" ADD FOREIGN KEY ("weatherId") REFERENCES "Weather"("id") ON DELETE SET NULL ON UPDATE CASCADE;
