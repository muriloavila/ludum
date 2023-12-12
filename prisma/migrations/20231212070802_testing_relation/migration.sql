-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_games" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "cover" TEXT,
    "platform_uuid" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "deleted_at" DATETIME
);
INSERT INTO "new_games" ("cover", "created_at", "deleted_at", "description", "id", "name", "platform_uuid", "updated_at", "uuid") SELECT "cover", "created_at", "deleted_at", "description", "id", "name", "platform_uuid", "updated_at", "uuid" FROM "games";
DROP TABLE "games";
ALTER TABLE "new_games" RENAME TO "games";
CREATE UNIQUE INDEX "games_uuid_key" ON "games"("uuid");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
