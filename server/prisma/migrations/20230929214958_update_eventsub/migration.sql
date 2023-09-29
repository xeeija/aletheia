/*
  Warnings:

  - Added the required column `type` to the `EventSubscription` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "EventSubscription" DROP CONSTRAINT "EventSubscription_randomWheelId_fkey";

-- AlterTable
ALTER TABLE "EventSubscription" ADD COLUMN     "condition" JSONB,
ADD COLUMN     "type" TEXT NOT NULL,
ALTER COLUMN "randomWheelId" DROP NOT NULL,
ALTER COLUMN "rewardId" DROP NOT NULL,
ALTER COLUMN "subscriptionId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "RandomWheelEntry" ADD COLUMN     "redemptionId" TEXT;

-- AddForeignKey
ALTER TABLE "EventSubscription" ADD CONSTRAINT "EventSubscription_randomWheelId_fkey" FOREIGN KEY ("randomWheelId") REFERENCES "RandomWheel"("id") ON DELETE SET NULL ON UPDATE CASCADE;
