/*
  Warnings:

  - You are about to drop the column `eventSubscriptionId` on the `RandomWheel` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "RandomWheel" DROP CONSTRAINT "RandomWheel_eventSubscriptionId_fkey";

-- AlterTable
ALTER TABLE "RandomWheel" DROP COLUMN "eventSubscriptionId";

-- CreateTable
CREATE TABLE "RandomWheelSync" (
    "id" UUID NOT NULL,
    "randomWheelId" UUID NOT NULL,
    "eventSubscriptionId" UUID NOT NULL,
    "paused" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "RandomWheelSync_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RandomWheelSync_randomWheelId_eventSubscriptionId_key" ON "RandomWheelSync"("randomWheelId", "eventSubscriptionId");

-- AddForeignKey
ALTER TABLE "RandomWheelSync" ADD CONSTRAINT "RandomWheelSync_randomWheelId_fkey" FOREIGN KEY ("randomWheelId") REFERENCES "RandomWheel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RandomWheelSync" ADD CONSTRAINT "RandomWheelSync_eventSubscriptionId_fkey" FOREIGN KEY ("eventSubscriptionId") REFERENCES "EventSubscription"("id") ON DELETE CASCADE ON UPDATE CASCADE;
