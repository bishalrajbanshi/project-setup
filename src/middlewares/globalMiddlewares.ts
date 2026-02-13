import { logger } from "@common/logger";
import { ApiError } from "@config/apiError.config";
import { Request, Response, NextFunction } from "express";

export function globalErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.error("🔴 Global error handler 🔴", err);
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      data: err.data || null,
      errors: err.errors || [],
    });
  }
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    data: null,
    errors: [err.message || "Something went wrong"],
  });
}
