-- AlterTable
ALTER TABLE "RandomWheel" ADD COLUMN     "themeId" UUID;

-- AlterTable
ALTER TABLE "RandomWheelEntry" ADD COLUMN     "color" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "standardThemeId" UUID;

-- CreateTable
CREATE TABLE "ColorTheme" (
    "id" UUID NOT NULL,
    "name" TEXT,
    "colors" TEXT[],
    "creatorId" UUID,
    "global" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ColorTheme_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_standardThemeId_fkey" FOREIGN KEY ("standardThemeId") REFERENCES "ColorTheme"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RandomWheel" ADD CONSTRAINT "RandomWheel_themeId_fkey" FOREIGN KEY ("themeId") REFERENCES "ColorTheme"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ColorTheme" ADD CONSTRAINT "ColorTheme_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
