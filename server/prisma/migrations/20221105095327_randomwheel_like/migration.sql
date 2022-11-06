-- CreateTable
CREATE TABLE "RandomWheelLike" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "randomWheelId" UUID NOT NULL,

    CONSTRAINT "RandomWheelLike_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RandomWheelLike" ADD CONSTRAINT "RandomWheelLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RandomWheelLike" ADD CONSTRAINT "RandomWheelLike_randomWheelId_fkey" FOREIGN KEY ("randomWheelId") REFERENCES "RandomWheel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
