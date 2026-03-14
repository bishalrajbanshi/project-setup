import {
  body,
  type ValidationChain,
  validationResult,
} from "express-validator";
import type { RequestHandler } from "express";
import { ApiError, type ErrorDetails } from "core/config/error.handler.config";

export const whitelistFields = (allowedFields: string[]): ValidationChain => {
  return body().custom((_, { req }) => {
    if (!req.body || typeof req.body !== "object") return true;
    const extraFields = Object.keys(req.body).filter(
      (key) => !allowedFields.includes(key)
    );
    extraFields.forEach((field) => {
      delete req.body[field];
    });

    return true;
  });
};

export const checkValidation = (validations: ValidationChain[]) => {
  const handler: RequestHandler = async (req, _res, next): Promise<void> => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    const details: ErrorDetails[] = errors.array().map((e: any) => ({
      field: typeof e.path === "string" ? e.path : undefined,
      message: typeof e.msg === "string" ? e.msg : "Validation error",
    }));

    return next(
      new ApiError(
        "The request failed due to a validation problem",
        422,
        details
      )
    );
  };

  return handler;
};
