import { HttpException } from "../exceptions/httpException";
import { errorCodes } from "../constants/errorCodes";

export type ErrorDetails = {
  field?: string;
  message: string;
};

export class ApiError extends HttpException {
  constructor(
    message: string,
    status: number,
    details?: ErrorDetails[],
    code?: string
  ) {
    const defaultCode =
      status === 422
        ? errorCodes.VALIDATION_ERROR
        : status === 401
        ? errorCodes.AUTHENTICATION_FAILED
        : status === 403
        ? errorCodes.AUTHORIZATION_FAILED
        : errorCodes.UNKNOWN_ERROR;

    super(
      status,
      message,
      code ?? defaultCode,
      details ? { details } : undefined
    );
  }
}
