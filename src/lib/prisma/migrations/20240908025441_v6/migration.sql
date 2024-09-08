/*
  Warnings:

  - You are about to drop the column `isPublished` on the `Post` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Post" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "tags" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "order" INTEGER,
    "updatedAt" DATETIME NOT NULL,
    "authorId" TEXT NOT NULL,
    CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Post" ("authorId", "content", "createdAt", "id", "isActive", "order", "tags", "title", "updatedAt") SELECT "authorId", "content", "createdAt", "id", "isActive", "order", "tags", "title", "updatedAt" FROM "Post";
DROP TABLE "Post";
ALTER TABLE "new_Post" RENAME TO "Post";
CREATE UNIQUE INDEX "Post_id_key" ON "Post"("id");
CREATE INDEX "Post_title_idx" ON "Post"("title");
CREATE INDEX "Post_tags_idx" ON "Post"("tags");
CREATE INDEX "Post_order_idx" ON "Post"("order");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
