-- CreateTable
CREATE TABLE "UserAccessToken" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "accessToken" TEXT NOT NULL,
    "refreshToken" TEXT,
    "scope" TEXT[],
    "expiresIn" INTEGER NOT NULL,
    "obtainmentTimestamp" BIGINT NOT NULL,
    "twitchUserId" TEXT,
    "twitchUsername" TEXT,

    CONSTRAINT "UserAccessToken_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserAccessToken" ADD CONSTRAINT "UserAccessToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
