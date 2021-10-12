-- CreateTable
CREATE TABLE "CoupleInvitation" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "senderId" INTEGER NOT NULL,
    "receiverId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CoupleInvitation" ADD FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoupleInvitation" ADD FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
