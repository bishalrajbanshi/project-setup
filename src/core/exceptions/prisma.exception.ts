import { Prisma } from '@prisma/client';
import { HttpException } from '@/core/exceptions/httpException';
import { httpStatus } from '@/core/constants/httpStatus';

type PrismaErrorMapping = {
  status: number;
  message: string;
  code: string;
};

const PRISMA_ERROR_MAP: Record<string, PrismaErrorMapping> = {
  P2000: {
    status: httpStatus.BAD_REQUEST,
    message: 'Input value too long for database column',
    code: 'PRISMA_VALUE_TOO_LONG',
  },

  P2001: {
    status: httpStatus.NOT_FOUND,
    message: 'Record does not exist',
    code: 'PRISMA_RECORD_NOT_FOUND',
  },

  P2002: {
    status: httpStatus.CONFLICT,
    message: 'Unique constraint failed',
    code: 'PRISMA_UNIQUE_CONSTRAINT',
  },

  P2003: {
    status: httpStatus.BAD_REQUEST,
    message: 'Foreign key constraint failed',
    code: 'PRISMA_FOREIGN_KEY_CONSTRAINT',
  },

  P2004: {
    status: httpStatus.BAD_REQUEST,
    message: 'Database constraint failed',
    code: 'PRISMA_CONSTRAINT_FAILED',
  },

  P2011: {
    status: httpStatus.BAD_REQUEST,
    message: 'Null constraint violation',
    code: 'PRISMA_NULL_CONSTRAINT',
  },

  P2012: {
    status: httpStatus.BAD_REQUEST,
    message: 'Missing required value',
    code: 'PRISMA_MISSING_VALUE',
  },

  P2014: {
    status: httpStatus.BAD_REQUEST,
    message: 'Invalid relation between records',
    code: 'PRISMA_INVALID_RELATION',
  },

  P2025: {
    status: httpStatus.NOT_FOUND,
    message: 'Requested record does not exist',
    code: 'PRISMA_RECORD_NOT_FOUND',
  },
};

export const prismaExceptionFilter = (error: unknown): HttpException | null => {
  /**
   * Known request errors
   */
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const mappedError = PRISMA_ERROR_MAP[error.code];

    if (mappedError) {
      return new HttpException(
        mappedError.status,
        mappedError.message,
        mappedError.code,
        {
          prismaCode: error.code,
          meta: error.meta ?? undefined,
        }
      );
    }

    return new HttpException(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Database operation failed',
      'PRISMA_UNKNOWN_ERROR',
      { prismaCode: error.code }
    );
  }

  /**
   * Validation errors
   */
  if (error instanceof Prisma.PrismaClientValidationError) {
    return new HttpException(
      httpStatus.BAD_REQUEST,
      'Invalid query parameters or data format',
      'PRISMA_VALIDATION_ERROR'
    );
  }

  /**
   * Initialization errors
   */
  if (error instanceof Prisma.PrismaClientInitializationError) {
    return new HttpException(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Database connection initialization failed',
      'PRISMA_INIT_ERROR'
    );
  }

  /**
   * Engine panic
   */
  if (error instanceof Prisma.PrismaClientRustPanicError) {
    return new HttpException(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Database engine panic',
      'PRISMA_ENGINE_PANIC'
    );
  }

  /**
   * Unknown Prisma error
   */
  if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    return new HttpException(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Unknown database error occurred',
      'PRISMA_UNKNOWN_REQUEST_ERROR'
    );
  }

  return null;
};