import { Request, Response, NextFunction } from "express";
import { HttpException } from "@/core/exceptions/httpException";
import { logger } from "@/core/common/logger";
import { httpStatus } from "@/core/constants/httpStatus";
import { prismaExceptionFilter } from "@/core/exceptions/prisma.exception";
import { error } from "@/core/constants/errorCodes";

const isJsonBodyParserError = (
  error: unknown
): error is SyntaxError & { status: number; type?: string; body?: string } => {
  if (!(error instanceof SyntaxError)) return false;
  const anyErr = error as any;
  return (
    typeof anyErr.status === "number" &&
    anyErr.status === 400 &&
    (anyErr.type === "entity.parse.failed" || typeof anyErr.body === "string")
  );
};

export const routeNotFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    statusCode: httpStatus.NOT_FOUND,
    message: error.NOT_FOUND || "Route not found",
    path: req.originalUrl,         
    method: req.method,             
    stack: process.env.NODE_ENV === "development" ? "Route does not exist" : undefined,
  });
};

export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (isJsonBodyParserError(error)) {
    const httpError = new HttpException(
      httpStatus.BAD_REQUEST,
      "Invalid JSON payload",
      "INVALID_JSON",
      { reason: error.message }
    );

    logger.error(httpError.message, httpError.metadata);

    return res.status(httpError.status).json({
      success: false,
      statusCode: httpError.status,
      message: httpError.message,
      errorCode: httpError.code,
      metadata: httpError.metadata,
      stack:
        process.env.NODE_ENV === "development" ? httpError.stack : undefined,
    });
  }

  const prismaError = prismaExceptionFilter(error);

  if (prismaError) {
    error = prismaError;
  }

  if (error instanceof HttpException) {
    logger.error(error.message, error.metadata);

    return res.status(error.status).json({
      success: false,
      statusCode: error.status,
      message: error.message,
      error: error.code,
      metadata: error.metadata,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }

  logger.error("Unhandled error", error);

  return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: "Internal server error",
  });
};
