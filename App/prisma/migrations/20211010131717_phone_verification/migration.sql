-- CreateTable
CREATE TABLE "PhoneVerification" (
    "id" SERIAL NOT NULL,
    "auth" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);
