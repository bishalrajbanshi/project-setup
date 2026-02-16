export class ApiError extends Error {
  public statusCode: number;
  public errors: any[];
  public data: any;

  constructor(
    message: string,
    statusCode = 500,
    errors: any[] = [],
    data: any = null
  ) {
    super(message); 
    this.statusCode = statusCode;
    this.errors = errors;
    this.data = data;
    Object.setPrototypeOf(this, ApiError.prototype);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }
}

export const HttpError = (
  message: string,
  statusCode = 500,
  errors: any[] = [],
  data: any = null
): never => {
  throw new ApiError(message, statusCode, errors, data);
};

