/*
  Warnings:

  - Added the required column `updatedAt` to the `permissionresources` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "permissionactions" DROP CONSTRAINT "permissionactions_permissionId_fkey";

-- DropForeignKey
ALTER TABLE "permissionresources" DROP CONSTRAINT "permissionresources_permissionId_fkey";

-- AlterTable
ALTER TABLE "permissionresources" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "permissionresources" ADD CONSTRAINT "permissionresources_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permissionactions" ADD CONSTRAINT "permissionactions_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
