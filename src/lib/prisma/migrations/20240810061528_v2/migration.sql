/*
  Warnings:

  - You are about to drop the column `visitorAuthorid` on the `Comment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_visitorAuthorid_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "visitorAuthorid",
ADD COLUMN     "visitorAuthorId" TEXT;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_visitorAuthorId_fkey" FOREIGN KEY ("visitorAuthorId") REFERENCES "Visitor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
