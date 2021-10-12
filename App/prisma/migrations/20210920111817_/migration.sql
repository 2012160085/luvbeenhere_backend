/*
  Warnings:

  - A unique constraint covering the columns `[senderId,receiverId]` on the table `CoupleInvitation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CoupleInvitation.senderId_receiverId_unique" ON "CoupleInvitation"("senderId", "receiverId");
