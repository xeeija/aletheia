/*
  Warnings:

  - A unique constraint covering the columns `[userId,randomWheelId]` on the table `RandomWheelLike` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "RandomWheelLike_userId_randomWheelId_key" ON "RandomWheelLike"("userId", "randomWheelId");
