/*
  Warnings:

  - You are about to drop the column `description` on the `permissions` table. All the data in the column will be lost.
  - Added the required column `password` to the `permissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "permissions" DROP COLUMN "description",
ADD COLUMN     "password" VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "password" VARCHAR(100) NOT NULL;
