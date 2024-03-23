/*
  Warnings:

  - A unique constraint covering the columns `[rewardGroupId,rewardId]` on the table `RewardGroupItem` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `RewardGroup` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rewardId` to the `RewardGroupItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RewardGroup" ADD COLUMN     "userId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "RewardGroupItem" RENAME COLUMN "trigger" TO "triggerCooldown";

ALTER TABLE "RewardGroupItem" ADD COLUMN     "rewardEnabled" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "rewardId" TEXT NOT NULL;
-- ADD COLUMN     "triggerCooldown" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "RewardGroupItem_rewardGroupId_rewardId_key" ON "RewardGroupItem"("rewardGroupId", "rewardId");

-- AddForeignKey
ALTER TABLE "RewardGroup" ADD CONSTRAINT "RewardGroup_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
