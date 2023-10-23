/*
  Warnings:

  - Added the required column `subscriptionType` to the `EventSubscription` table without a default value. This is not possible if the table is not empty.

*/

ALTER TABLE "EventSubscription" RENAME COLUMN "type" TO "subscriptionType";

-- AlterTable
ALTER TABLE "EventSubscription" ADD COLUMN     "rewardGroupId" UUID,
ADD COLUMN     "type" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "RewardGroup" (
    "id" UUID NOT NULL,
    "name" TEXT,
    "triggerSelected" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "RewardGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RewardGroupItem" (
    "id" UUID NOT NULL,
    "rewardGroupId" UUID NOT NULL,
    "trigger" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "RewardGroupItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EventSubscription" ADD CONSTRAINT "EventSubscription_rewardGroupId_fkey" FOREIGN KEY ("rewardGroupId") REFERENCES "RewardGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RewardGroupItem" ADD CONSTRAINT "RewardGroupItem_rewardGroupId_fkey" FOREIGN KEY ("rewardGroupId") REFERENCES "RewardGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;
