import { ApiError } from "core/config/apiError.config";
import { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";

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
  let statusCode = 500;
  let message = "Internal Server Error";
  let errors: any = [];

  /**
   * custom error handler
   */

  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
    errors = err.errors || [];
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    /**
     * prisma error
     */
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
    } else if (err.code === "P2003") {
      const target = (err.meta as any)?.field_name || [];
      message = err.message;
      errors = [
        {
          field: target,
          msg: `Foreign key constraint failed on field(s): ${target.join(
            ", "
          )}`,
        },
      ];
      statusCode = 400;
    } else if (err.code === "P2025") {
      const target = (err.meta as any)?.field_name || [];
      message = err.message;
      errors = [
        {
          msg: `No record found`,
        },
      ];
    } else {
      errors = [{ msg: err.message }];
    }
  } else {
    /**
     * unknown error
     */
    errors = [{ msg: err.message || "Something went wrong" }];
  }

  if (errors.length === 1) errors = errors[0];

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    data: null,
    errors,
  });
}
