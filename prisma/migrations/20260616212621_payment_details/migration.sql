-- AlterTable
ALTER TABLE "User" ADD COLUMN "accountName" TEXT;
ALTER TABLE "User" ADD COLUMN "accountNumber" TEXT;
ALTER TABLE "User" ADD COLUMN "bankName" TEXT;
ALTER TABLE "User" ADD COLUMN "walletAddress" TEXT;
ALTER TABLE "User" ADD COLUMN "walletNetwork" TEXT;

-- CreateTable
CREATE TABLE "Withdrawal" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "amount" REAL NOT NULL,
    "fee" REAL NOT NULL,
    "amountToReceive" REAL NOT NULL,
    "method" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Withdrawal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
