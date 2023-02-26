-- DropForeignKey
ALTER TABLE "RandomWheelWinner" DROP CONSTRAINT "RandomWheelWinner_drawnById_fkey";

-- AlterTable
ALTER TABLE "RandomWheelWinner" ALTER COLUMN "drawnById" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "RandomWheelWinner" ADD CONSTRAINT "RandomWheelWinner_drawnById_fkey" FOREIGN KEY ("drawnById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
