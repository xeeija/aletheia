-- CreateTable
CREATE TABLE "TwitchState" (
    "state" TEXT NOT NULL,

    CONSTRAINT "TwitchState_pkey" PRIMARY KEY ("state")
);

-- CreateIndex
CREATE UNIQUE INDEX "TwitchState_state_key" ON "TwitchState"("state");
