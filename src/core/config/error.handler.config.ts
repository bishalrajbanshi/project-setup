export type ErrorDetails = {
  field?: string;
  message: string;
};

export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly errors: ErrorDetails[];
  public readonly data: any;
  public readonly isOperational: boolean;

  constructor(
    message: string,
    statusCode = 500,
    errors: ErrorDetails[] = [],
    data: any = null,
    isOperational = true // Distinguishes expected vs unexpected errors
  ) {
    super(message);

    this.statusCode = statusCode;
    this.errors = errors;
    this.data = data;
    this.isOperational = isOperational;

    // Fix prototype chain for instanceof checks
    Object.setPrototypeOf(this, ApiError.prototype);

    // Capture stack trace (skip in production if you want)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }
}

/**
 * Helper function to throw an HTTP error
 */
export const HttpError = (
  message: string,
  statusCode = 500,
  errors: ErrorDetails[] = [],
  data: any = null
): never => {
  throw new ApiError(message, statusCode, errors, data);
};
