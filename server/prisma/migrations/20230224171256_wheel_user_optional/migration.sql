-- DropForeignKey
ALTER TABLE "RandomWheel" DROP CONSTRAINT "RandomWheel_ownerId_fkey";

-- AlterTable
ALTER TABLE "RandomWheel" ALTER COLUMN "spinDuration" SET DEFAULT 8000,
ALTER COLUMN "fadeDuration" SET DEFAULT 8000,
ALTER COLUMN "ownerId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "RandomWheel" ADD CONSTRAINT "RandomWheel_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
