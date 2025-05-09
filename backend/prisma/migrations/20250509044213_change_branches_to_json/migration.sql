/*
  Warnings:

  - The `branches` column on the `GithubRepo` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "GithubRepo" DROP COLUMN "branches",
ADD COLUMN     "branches" JSONB;
