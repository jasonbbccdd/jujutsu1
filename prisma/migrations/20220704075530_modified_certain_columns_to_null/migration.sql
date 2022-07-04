/*
  Warnings:

  - A unique constraint covering the columns `[code,version,stage]` on the table `Tournament` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `stage` to the `Tournament` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stageName` to the `Tournament` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Tournament_code_version_key";

-- AlterTable
ALTER TABLE "Group" ALTER COLUMN "name" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Tournament" ADD COLUMN     "stage" TEXT NOT NULL,
ADD COLUMN     "stageName" TEXT NOT NULL,
ALTER COLUMN "host" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Tournament_code_version_stage_key" ON "Tournament"("code", "version", "stage");
