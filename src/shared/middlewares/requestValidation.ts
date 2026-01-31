import { Response, NextFunction, Request } from "express";
import { AppError } from "../error/AppError";

const requestValidation =
  (schema: any) =>
  async (request: Request, _: Response, next: NextFunction) => {
    try {
      await schema.validate({
        body: request.body,
        query: request.query,
        params: request.params,
      });

      return next();
    } catch (err: any) {
      throw new AppError(err.message);
    }
  };

export { requestValidation };
