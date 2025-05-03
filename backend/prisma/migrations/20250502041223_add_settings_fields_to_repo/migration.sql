-- AlterTable
ALTER TABLE "GithubRepo" ADD COLUMN     "branches" TEXT[],
ADD COLUMN     "defaultBranch" TEXT,
ADD COLUMN     "lastSyncedAt" TIMESTAMP(3);
