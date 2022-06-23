-- CreateTable
CREATE TABLE "_session" (
    "sid" VARCHAR NOT NULL,
    "sess" JSON NOT NULL,
    "expire" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "_session_pkey" PRIMARY KEY ("sid")
);

-- CreateTable
CREATE TABLE "AccessType" (
    "type" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "RandomWheel" (
    "id" UUID NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "uniqueEntries" BOOLEAN NOT NULL DEFAULT false,
    "accessType" TEXT NOT NULL DEFAULT E'PRIVATE',
    "rotation" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "spinDuration" INTEGER NOT NULL DEFAULT 6000,
    "fadeDuration" INTEGER NOT NULL DEFAULT 6000,
    "ownerId" UUID NOT NULL,

    CONSTRAINT "RandomWheel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RandomWheelEntry" (
    "id" UUID NOT NULL,
    "randomWheelId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RandomWheelEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RandomWheelWinner" (
    "id" UUID NOT NULL,
    "randomWheelId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "drawnById" UUID NOT NULL,
    "winnerIndex" INTEGER,

    CONSTRAINT "RandomWheelWinner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RandomWheelMember" (
    "id" UUID NOT NULL,
    "randomWheelId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "roleName" TEXT NOT NULL,

    CONSTRAINT "RandomWheelMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RandomWheelRole" (
    "name" TEXT NOT NULL,
    "description" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "AccessType_type_key" ON "AccessType"("type");

-- CreateIndex
CREATE UNIQUE INDEX "RandomWheel_slug_key" ON "RandomWheel"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "RandomWheelRole_name_key" ON "RandomWheelRole"("name");

-- AddForeignKey
ALTER TABLE "RandomWheel" ADD CONSTRAINT "RandomWheel_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RandomWheel" ADD CONSTRAINT "RandomWheel_accessType_fkey" FOREIGN KEY ("accessType") REFERENCES "AccessType"("type") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RandomWheelEntry" ADD CONSTRAINT "RandomWheelEntry_randomWheelId_fkey" FOREIGN KEY ("randomWheelId") REFERENCES "RandomWheel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RandomWheelWinner" ADD CONSTRAINT "RandomWheelWinner_drawnById_fkey" FOREIGN KEY ("drawnById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RandomWheelWinner" ADD CONSTRAINT "RandomWheelWinner_randomWheelId_fkey" FOREIGN KEY ("randomWheelId") REFERENCES "RandomWheel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RandomWheelMember" ADD CONSTRAINT "RandomWheelMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RandomWheelMember" ADD CONSTRAINT "RandomWheelMember_randomWheelId_fkey" FOREIGN KEY ("randomWheelId") REFERENCES "RandomWheel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RandomWheelMember" ADD CONSTRAINT "RandomWheelMember_roleName_fkey" FOREIGN KEY ("roleName") REFERENCES "RandomWheelRole"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
