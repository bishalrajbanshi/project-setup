/*
  Warnings:

  - You are about to drop the `permissionactions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `permissionresources` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `permissions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `rolepermissions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `userpermissions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `userrolepermissions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `userroles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "permissionactions" DROP CONSTRAINT "permissionactions_permissionId_fkey";

-- DropForeignKey
ALTER TABLE "permissionresources" DROP CONSTRAINT "permissionresources_permissionId_fkey";

-- DropForeignKey
ALTER TABLE "rolepermissions" DROP CONSTRAINT "rolepermissions_permissionId_fkey";

-- DropForeignKey
ALTER TABLE "rolepermissions" DROP CONSTRAINT "rolepermissions_roleId_fkey";

-- DropForeignKey
ALTER TABLE "userpermissions" DROP CONSTRAINT "userpermissions_permissionId_fkey";

-- DropForeignKey
ALTER TABLE "userpermissions" DROP CONSTRAINT "userpermissions_userId_fkey";

-- DropForeignKey
ALTER TABLE "userrolepermissions" DROP CONSTRAINT "userrolepermissions_permissionId_fkey";

-- DropForeignKey
ALTER TABLE "userrolepermissions" DROP CONSTRAINT "userrolepermissions_roleId_fkey";

-- DropForeignKey
ALTER TABLE "userrolepermissions" DROP CONSTRAINT "userrolepermissions_userId_fkey";

-- DropForeignKey
ALTER TABLE "userroles" DROP CONSTRAINT "userroles_roleId_fkey";

-- DropForeignKey
ALTER TABLE "userroles" DROP CONSTRAINT "userroles_userId_fkey";

-- DropTable
DROP TABLE "permissionactions";

-- DropTable
DROP TABLE "permissionresources";

-- DropTable
DROP TABLE "permissions";

-- DropTable
DROP TABLE "rolepermissions";

-- DropTable
DROP TABLE "userpermissions";

-- DropTable
DROP TABLE "userrolepermissions";

-- DropTable
DROP TABLE "userroles";
