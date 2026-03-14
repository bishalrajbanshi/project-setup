import { connectDb, disconnectDb } from "core/config/db.config";
import { CreateApp } from "./app";
import { createServer, Server as HttpServer } from "http";
import { logger } from "core/common/logger";
import { SocketManager } from "./socket.managet"; 

class Server extends CreateApp {
  private readonly port: number = parseInt(process.env.PORT || "3000", 10);
  private server!: HttpServer;

  private bootstrap = async (): Promise<void> => {
    try {
      await connectDb();

      const app = this.createApp();

      this.server = createServer(app);

      // 4️Initialize Socket.IO 
      const socketManager = SocketManager.getInstance();
      socketManager.init(this.server);

      this.server.listen(this.port, () => {
        logger.info(`✅ Server running on http://localhost:${this.port} ✅`);
      });

      // Graceful shutdown
      const shutdown = async (signal: string) => {
        logger.warn(`⚠️  ${signal} received. Shutting down... ⚠️`);
        await new Promise<void>((resolve, reject) => {
          this.server.close((err) => (err ? reject(err) : resolve()));
        });
        await disconnectDb();
        logger.info("🟢 Shutdown complete, exiting process 🟢");
      };

      process.on("SIGINT", () => shutdown("SIGINT"));
      process.on("SIGTERM", () => shutdown("SIGTERM"));

      process.on("uncaughtException", (error) => {
        logger.error("🔴 Uncaught exception 🔴", error);
        process.exit(1);
      });

      process.on("unhandledRejection", (error) => {
        logger.error("🔴 Unhandled rejection 🔴", error);
        process.exit(1);
      });
    } catch (error) {
      logger.error("❌ Server startup failed ❌", error);
      process.exit(1);
    }
  };

  public start(): void {
    this.bootstrap();
  }
}

new Server().start();