/*
  Warnings:

  - Added the required column `overallScore` to the `Scan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Scan" ADD COLUMN     "overallScore" INTEGER NOT NULL;
