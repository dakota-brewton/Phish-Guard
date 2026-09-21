/*
  Warnings:

  - Added the required column `overallRL` to the `Scan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Scan" ADD COLUMN     "overallRL" TEXT NOT NULL;
