-- DropForeignKey
ALTER TABLE "Analysis" DROP CONSTRAINT "Analysis_fileId_fkey";

-- DropForeignKey
ALTER TABLE "Analysis" DROP CONSTRAINT "Analysis_userId_fkey";

-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_userId_fkey";

-- DropForeignKey
ALTER TABLE "GithubRepo" DROP CONSTRAINT "GithubRepo_userId_fkey";

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Analysis" ADD CONSTRAINT "Analysis_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Analysis" ADD CONSTRAINT "Analysis_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GithubRepo" ADD CONSTRAINT "GithubRepo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
