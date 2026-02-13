import { logger } from "@common/logger";
import { ApiError } from "@config/apiError.config";
import { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";

export function globalErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.error("🔴 Global error handler 🔴", err);

  let statusCode = 500;
  let message = "Internal Server Error";
  let errors: any = [];

  // ===============================
  // Custom ApiError
  // ===============================
  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
    errors = err.errors || [];
  }
  // ===============================
  // Prisma known errors
  // ===============================
  else if (err instanceof Prisma.PrismaClientKnownRequestError) {

    if (err.code === "P2002") {
      const target = (err.meta as any)?.target || [];
      message = err.message;
      errors = [
        {
          field: target.join(", "),
          msg: `Duplicate value for unique field(s): ${target.join(", ")}`,
        },
      ];
      statusCode = 409;
    } 
    else if (err.code === "P2003") {

      const target = (err.meta as any)?.field_name || [];
      message = err.message;
      errors = [{ field: target, msg: `Foreign key constraint failed on field(s): ${target}` }];
      statusCode = 400;

    } else {
      errors = [{ msg: err.message }];
    }
  }
  // ===============================
  // Unknown errors
  // ===============================
  else {
    errors = [{ msg: err.message || "Something went wrong" }];
  }

  // ===============================
  // Convert single error to object
  // ===============================
  if (errors.length === 1) errors = errors[0];

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    data: null,
    errors,
  });
}
