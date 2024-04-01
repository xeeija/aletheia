/*
  Warnings:

  - You are about to drop the column `randomWheelId` on the `EventSubscription` table. All the data in the column will be lost.
  - You are about to drop the column `rewardGroupId` on the `EventSubscription` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "EventSubscription" DROP CONSTRAINT "EventSubscription_randomWheelId_fkey";

-- DropForeignKey
ALTER TABLE "EventSubscription" DROP CONSTRAINT "EventSubscription_rewardGroupId_fkey";

-- DropForeignKey
ALTER TABLE "RewardGroup" DROP CONSTRAINT "RewardGroup_userId_fkey";

-- AlterTable
ALTER TABLE "EventSubscription" DROP COLUMN "randomWheelId",
DROP COLUMN "rewardGroupId";

-- AlterTable
ALTER TABLE "RandomWheel" ADD COLUMN     "eventSubscriptionId" UUID;

-- AlterTable
ALTER TABLE "RewardGroup" ADD COLUMN     "cooldownExpiry" TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE "RandomWheel" ADD CONSTRAINT "RandomWheel_eventSubscriptionId_fkey" FOREIGN KEY ("eventSubscriptionId") REFERENCES "EventSubscription"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RewardGroup" ADD CONSTRAINT "RewardGroup_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
