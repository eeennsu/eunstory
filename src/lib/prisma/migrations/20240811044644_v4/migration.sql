/*
  Warnings:

  - You are about to drop the column `adminAuthorId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_adminAuthorId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "adminAuthorId",
ADD COLUMN     "userAuthorId" TEXT;

-- DropTable
DROP TABLE "Admin";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userAuthorId_fkey" FOREIGN KEY ("userAuthorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
