-- CreateTable
CREATE TABLE "usercredentials" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usercredentials_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "usercredentials" ADD CONSTRAINT "usercredentials_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
