/*
  Warnings:

  - You are about to alter the column `action` on the `permissionactions` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to drop the column `actions` on the `permissions` table. All the data in the column will be lost.
  - You are about to drop the column `resources` on the `permissions` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "permissions_resources_actions_key";

-- AlterTable
ALTER TABLE "permissionactions" ALTER COLUMN "action" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "permissions" DROP COLUMN "actions",
DROP COLUMN "resources";

-- CreateTable
CREATE TABLE "permissionresources" (
    "id" TEXT NOT NULL,
    "resources" VARCHAR(255) NOT NULL,
    "permissionId" TEXT NOT NULL,

    CONSTRAINT "permissionresources_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "permissionresources" ADD CONSTRAINT "permissionresources_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "permissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
