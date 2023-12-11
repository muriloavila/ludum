/*
  Warnings:

  - You are about to drop the `Platform` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Platform";

-- CreateTable
CREATE TABLE "platforms" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cover" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "platforms_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "platforms_uuid_key" ON "platforms"("uuid");
