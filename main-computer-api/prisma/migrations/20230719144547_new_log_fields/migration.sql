/*
  Warnings:

  - Added the required column `realm` to the `Log` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "LogRealm" AS ENUM ('PERSONAL', 'OFFICIAL');

-- AlterTable
ALTER TABLE "Log" ADD COLUMN     "realm" "LogRealm" NOT NULL;
