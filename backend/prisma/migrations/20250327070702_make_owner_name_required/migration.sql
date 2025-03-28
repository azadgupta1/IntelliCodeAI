/*
  Warnings:

  - Made the column `ownerName` on table `GithubRepo` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "GithubRepo" ALTER COLUMN "ownerName" SET NOT NULL;
