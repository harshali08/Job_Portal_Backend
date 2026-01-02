/*
  Warnings:

  - You are about to drop the column `age` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "age";

-- CreateTable
CREATE TABLE "JobPost" (
    "id" TEXT NOT NULL,
    "job_role" TEXT NOT NULL,
    "job_type" TEXT NOT NULL,
    "job_description" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "salary" INTEGER,
    "location" TEXT,
    "category" TEXT NOT NULL,
    "key_responsibities" TEXT NOT NULL,
    "professional_skills" TEXT NOT NULL,
    "tags" TEXT[],
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JobPost_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "JobPost" ADD CONSTRAINT "JobPost_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobPost" ADD CONSTRAINT "JobPost_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
