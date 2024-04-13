-- CreateTable
CREATE TABLE "RewardLink" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "rewardId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "RewardLink_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RewardLink_token_key" ON "RewardLink"("token");

-- CreateIndex
CREATE INDEX "RewardLink_token_idx" ON "RewardLink"("token");

-- AddForeignKey
ALTER TABLE "RewardLink" ADD CONSTRAINT "RewardLink_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
