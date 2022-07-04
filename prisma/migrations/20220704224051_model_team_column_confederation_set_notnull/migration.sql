/*
  Warnings:

  - Made the column `confederationId` on table `Team` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_confederationId_fkey";

-- AlterTable
ALTER TABLE "Team" ALTER COLUMN "confederationId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_confederationId_fkey" FOREIGN KEY ("confederationId") REFERENCES "Confederation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
