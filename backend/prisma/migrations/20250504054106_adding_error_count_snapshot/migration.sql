-- CreateTable
CREATE TABLE "RepoErrorHistory" (
    "id" SERIAL NOT NULL,
    "repoId" INTEGER NOT NULL,
    "errorCount" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RepoErrorHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "RepoErrorHistory_repoId_timestamp_idx" ON "RepoErrorHistory"("repoId", "timestamp");

-- AddForeignKey
ALTER TABLE "RepoErrorHistory" ADD CONSTRAINT "RepoErrorHistory_repoId_fkey" FOREIGN KEY ("repoId") REFERENCES "GithubRepo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
