/*
  Warnings:

  - The `tags` column on the `Post` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "tags",
ADD COLUMN     "tags" TEXT[];

-- CreateIndex
CREATE INDEX "Post_isActive_title_tags_idx" ON "Post"("isActive", "title", "tags");
