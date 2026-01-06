/*
  Warnings:

  - The `key_responsibities` column on the `JobPost` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `professional_skills` column on the `JobPost` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "JobPost" ADD COLUMN     "experience" INTEGER,
DROP COLUMN "key_responsibities",
ADD COLUMN     "key_responsibities" TEXT[],
DROP COLUMN "professional_skills",
ADD COLUMN     "professional_skills" TEXT[];
