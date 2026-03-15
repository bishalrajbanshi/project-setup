import { Server as HttpServer } from "http";
import { Server as SocketIOServer, Socket } from "socket.io";
import { logger } from "core/common/logger";

/**
 * Singleton class to manage Socket.IO server instance
 * Ensures only one Socket.IO server is created and provides a global access point
 * Usage:
 *   const socketManager = SocketManager.getInstance();
 *   const io = socketManager.init(httpServer);
 *   // Now you can use io to emit events or listen for connections form anywhere in your app
 */
export class SocketManager {
  private static instance: SocketManager;
  private io!: SocketIOServer;


  /**
   * Initialize Socket.IO with HTTP server
   */
  public init(server: HttpServer): SocketIOServer {
    if (this.io) {
      logger.warn("⚠️ Socket.IO already initialized!");
      return this.io;
    }

    this.io = new SocketIOServer(server, {
      cors: {
        origin: "*", // Update to frontend URL in production
        methods: ["GET", "POST"],
      },
    });

    this.io.on("connection", (socket: Socket) => {
      logger.info(`🔵 Socket connected: ${socket.id}`);

      socket.on("disconnect", (reason) => {
        logger.info(`🔴 Socket disconnected: ${socket.id} (${reason})`);
      });

      // Optional: Global events here
      socket.on("ping", () => socket.emit("pong"));
    });

    return this.io;
  }

  /**
   * Get the Socket.IO instance
   */
  public getIo(): SocketIOServer {
    if (!this.io) {
      throw new Error("Socket.IO not initialized! Call init(server) first.");
    }
    return this.io;
  }

  /**
   * Singleton instance accessor
   */
  public static getInstance(): SocketManager {
    if (!SocketManager.instance) {
      SocketManager.instance = new SocketManager();
    }
    return SocketManager.instance;
  }
}

/**
 * exaple to use this socket managet in seprate services
 * export class NotificationService {
 *   private io: SocketIOServer;
 *  constructor() {
 *   this.io = SocketManager.getInstance().getIo();
 * }
 * sendNotification(userId: string, message: string) {
 *   this.io.to(userId).emit("notification", message);
 * }
 * }
 */