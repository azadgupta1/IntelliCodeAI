/*
  Warnings:

  - A unique constraint covering the columns `[repoName,userId]` on the table `GithubRepo` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "GithubRepo_repoName_userId_key" ON "GithubRepo"("repoName", "userId");
