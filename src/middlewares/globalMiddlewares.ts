import { ApiError } from "core/config/error.handler.config";
import { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";
import { logger } from "core/common/logger";

/**
 * GLOBEL ERROR HANDLER
 * @param err
 * @param req
 * @param res
 * @param next
 */
export function globalErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (res.headersSent) return next(err);

  const isProd =
    process.env.NODE_ENV === "production" || process.env.NODE_ENV === "prod";

  let statusCode = 500;
  let message = "Internal Server Error";
  let errors: any = [];

  /**
   * custom error handler
   */

  // 1) First-class app errors
  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
    errors = err.errors || [];
  }

  // 2) Some code paths in this repo throw plain objects (e.g., from utils/response.apiError)
  else if (
    err &&
    typeof err === "object" &&
    (typeof err.statusCode === "number" || typeof err.status === "number") &&
    typeof err.message === "string"
  ) {
    statusCode = err.statusCode ?? err.status;
    message = err.message;
    errors = err.errors ?? err.error ?? [];
  }

  // 3) JSON body parse errors
  else if (
    err instanceof SyntaxError &&
    (err as any).type === "entity.parse.failed"
  ) {
    statusCode = 400;
    message = "Invalid JSON payload";
    errors = [{ msg: "Request body is not valid JSON" }];
  }

  // 4) JWT/auth errors (common in Express apps)
  else if (
    err?.name === "JsonWebTokenError" ||
    err?.name === "TokenExpiredError"
  ) {
    statusCode = 401;
    message = "Unauthorized";
    errors = [{ msg: err?.message || "Invalid token" }];
  }

  // 5) Prisma errors
  else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    /**
     * prisma error
     */
    if (err.code === "P2002") {
      const targetRaw = (err.meta as any)?.target;
      const target = Array.isArray(targetRaw)
        ? targetRaw
        : typeof targetRaw === "string"
        ? [targetRaw]
        : [];

      message = "Unique constraint failed";
      errors = [
        {
          field: target.join(", "),
          msg: `Duplicate value for unique field(s): ${target.join(", ")}`,
        },
      ];
      statusCode = 409;
    } else if (err.code === "P2003") {
      const targetRaw = (err.meta as any)?.field_name;
      const target = Array.isArray(targetRaw)
        ? targetRaw
        : typeof targetRaw === "string"
        ? [targetRaw]
        : [];

      message = "Foreign key constraint failed";
      errors = [
        {
          field: target.join(", "),
          msg: `Foreign key constraint failed on field(s): ${target.join(
            ", "
          )}`,
        },
      ];
      statusCode = 400;
    } else if (err.code === "P2025") {
      statusCode = 404;
      message = "Not found";
      errors = [{ msg: "No record found" }];
    } else {
      statusCode = 400;
      message = "Database error";
      errors = [{ msg: isProd ? "Invalid request" : err.message }];
    }
  } else if (err instanceof Prisma.PrismaClientValidationError) {
    statusCode = 400;
    message = "Invalid request";
    errors = [{ msg: isProd ? "Invalid request" : err.message }];
  } else {
    /**
     * unknown error
     */
    const maybeMessage = err?.message || "Something went wrong";
    statusCode = typeof err?.statusCode === "number" ? err.statusCode : 500;
    message =
      statusCode >= 500 && isProd ? "Internal Server Error" : maybeMessage;
    errors = [
      {
        msg:
          statusCode >= 500 && isProd ? "Internal Server Error" : maybeMessage,
      },
    ];
  }

  if (errors.length === 1) errors = errors[0];

  // Always log full error server-side (avoid leaking details in responses).
  try {
    const logMsg = `${req.method} ${req.originalUrl} -> ${err?.message || err}`;
    statusCode >= 500 ? logger.error(logMsg) : logger.warn(logMsg);
    if (!isProd && err?.stack) logger.debug(err.stack);
  } catch {
    // ignore logger failures
  }

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    data: null,
    errors,
  });
}
