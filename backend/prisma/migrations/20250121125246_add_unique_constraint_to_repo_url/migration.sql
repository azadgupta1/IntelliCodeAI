/*
  Warnings:

  - A unique constraint covering the columns `[repoUrl]` on the table `GithubRepo` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "GithubRepo_repoUrl_key" ON "GithubRepo"("repoUrl");
