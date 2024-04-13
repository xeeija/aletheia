/*
  Warnings:

  - You are about to drop the column `rewardId` on the `EventSubscription` table. All the data in the column will be lost.
  - You are about to drop the column `useInput` on the `EventSubscription` table. All the data in the column will be lost.
  - Added the required column `rewardId` to the `RandomWheelSync` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "EventSubscription" DROP CONSTRAINT "EventSubscription_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserAccessToken" DROP CONSTRAINT "UserAccessToken_userId_fkey";

-- AlterTable
ALTER TABLE "EventSubscription" DROP COLUMN "useInput";
ALTER TABLE "EventSubscription" RENAME COLUMN "rewardId" TO "itemId";

-- AlterTable
ALTER TABLE "RandomWheelSync" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "rewardId" TEXT NOT NULL,
ADD COLUMN     "useInput" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "eventSubscriptionId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "UserAccessToken" ADD CONSTRAINT "UserAccessToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventSubscription" ADD CONSTRAINT "EventSubscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
