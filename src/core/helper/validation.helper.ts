import { body, ValidationChain, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

type ErrorDetail = {
  message: string;
  errors: any[];
  statusCode: number;
};

const error = async (
  message: string,
  statusCode: number,
  errors: any[]
): Promise<ErrorDetail> => {
  return {
    message,
    statusCode,
    errors,
  };
};

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
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    const validationError = await error(
      "The request failed due to a validation problem",
      422,
      errors.array()
    );

    res.status(422).json(validationError);
  };
};
