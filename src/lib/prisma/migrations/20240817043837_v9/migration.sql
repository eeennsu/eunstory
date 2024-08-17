/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Post` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "username" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "Post_id_key" ON "Post"("id");
