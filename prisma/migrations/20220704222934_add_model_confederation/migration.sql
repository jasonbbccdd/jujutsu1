-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "confederationId" INTEGER;

-- CreateTable
CREATE TABLE "Confederation" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "Confederation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Confederation_code_key" ON "Confederation"("code");

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_confederationId_fkey" FOREIGN KEY ("confederationId") REFERENCES "Confederation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
