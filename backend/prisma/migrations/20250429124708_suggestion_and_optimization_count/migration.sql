-- AlterTable
ALTER TABLE "Analysis" ADD COLUMN     "optimizationCnt" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "suggestionCnt" INTEGER NOT NULL DEFAULT 0;
