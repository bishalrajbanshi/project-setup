import { Request, Response, NextFunction } from 'express';
import { HttpException } from '@/core/exceptions/httpException';
import { logger } from '@/core/common/logger';
import { httpStatus } from '@/core/constants/httpStatus';
import { prismaExceptionFilter } from '@/core/exceptions/prisma.exception';

export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {

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
      errorCode: error.code,
      metadata: error.metadata,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }

  logger.error('Unhandled error', error);

  return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: 'Internal server error'
  });
};