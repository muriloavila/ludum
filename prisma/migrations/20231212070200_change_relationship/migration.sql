/*
  Warnings:

  - You are about to drop the column `platformId` on the `games` table. All the data in the column will be lost.
  - Added the required column `platformUuid` to the `games` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_games" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "cover" TEXT,
    "platformUuid" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "deleted_at" DATETIME,
    CONSTRAINT "games_platformUuid_fkey" FOREIGN KEY ("platformUuid") REFERENCES "platforms" ("uuid") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_games" ("cover", "created_at", "deleted_at", "description", "id", "name", "updated_at", "uuid") SELECT "cover", "created_at", "deleted_at", "description", "id", "name", "updated_at", "uuid" FROM "games";
DROP TABLE "games";
ALTER TABLE "new_games" RENAME TO "games";
CREATE UNIQUE INDEX "games_uuid_key" ON "games"("uuid");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
