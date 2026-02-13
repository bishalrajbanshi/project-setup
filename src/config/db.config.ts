import { logger } from "@common/logger";
import prisma from "./prisma.client.config";


/**
 * Database connection 
 */
export const connectDb = async (): Promise<void> => {
  try {
    await prisma.$connect();
    logger.info("🚀 Database connected (Prisma)");
  } catch (error) {
    logger.error("🔴 Database connection failed", error);
    throw error; 
  }
};

/**
 * Database disconnect
 */
export const disconnectDb = async (): Promise<void> => {
  try {
    await prisma.$disconnect();
    logger.info("🟢 Database disconnected (Prisma) 🟢");
  } catch (error) {
    logger.error("🔴 Database disconnection failed 🟢", error);
  }
};
