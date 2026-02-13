-- CreateTable
CREATE TABLE "permissionactions" (
    "id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "permissionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "permissionactions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "permissionactions" ADD CONSTRAINT "permissionactions_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "permissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
