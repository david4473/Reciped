/*
  Warnings:

  - You are about to drop the column `isPubilc` on the `Recipe` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "isPubilc",
ADD COLUMN     "isPublic" BOOLEAN NOT NULL DEFAULT true;
