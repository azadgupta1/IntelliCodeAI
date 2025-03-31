-- AlterTable
ALTER TABLE "Analysis" ADD COLUMN     "githubRepoId" INTEGER;

-- AddForeignKey
ALTER TABLE "Analysis" ADD CONSTRAINT "Analysis_githubRepoId_fkey" FOREIGN KEY ("githubRepoId") REFERENCES "GithubRepo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
