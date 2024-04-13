-- AlterTable
ALTER TABLE "RewardGroup" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "RewardGroupItem" ALTER COLUMN "triggerCooldown" SET DEFAULT true;
