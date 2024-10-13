-- DropIndex
DROP INDEX "Post_isActive_title_tags_order_idx";

-- CreateIndex
CREATE INDEX "Post_isActive_title_tags_idx" ON "Post"("isActive", "title", "tags");
