-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Post" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "tags" TEXT,
    "order" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "deletedAt" DATETIME,
    "authorId" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL DEFAULT 'https://via.placeholder.com/150',
    "summary" TEXT NOT NULL DEFAULT 'summary',
    CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Post" ("authorId", "content", "createdAt", "deletedAt", "id", "isActive", "order", "tags", "title", "updatedAt") SELECT "authorId", "content", "createdAt", "deletedAt", "id", "isActive", "order", "tags", "title", "updatedAt" FROM "Post";
DROP TABLE "Post";
ALTER TABLE "new_Post" RENAME TO "Post";
CREATE UNIQUE INDEX "Post_id_key" ON "Post"("id");
CREATE INDEX "Post_isActive_title_tags_order_idx" ON "Post"("isActive", "title", "tags", "order");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;