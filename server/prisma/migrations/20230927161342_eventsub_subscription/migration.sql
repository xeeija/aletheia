-- CreateTable
CREATE TABLE "EventSubscription" (
    "id" UUID NOT NULL,
    "randomWheelId" UUID NOT NULL,
    "userId" UUID,
    "rewardId" TEXT NOT NULL,
    "twitchUserId" TEXT NOT NULL,
    "subscriptionId" TEXT NOT NULL,
    "useInput" BOOLEAN NOT NULL DEFAULT false,
    "paused" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "EventSubscription_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EventSubscription" ADD CONSTRAINT "EventSubscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventSubscription" ADD CONSTRAINT "EventSubscription_randomWheelId_fkey" FOREIGN KEY ("randomWheelId") REFERENCES "RandomWheel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
