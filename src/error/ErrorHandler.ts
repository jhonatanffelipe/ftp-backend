import { NextFunction, Request, Response } from "express";

import moment from "moment";
import { AppError } from "./AppError";

function ErrorHandler(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction,
): Response {
  console.log({
    error,
    date: moment().format("YYYY-MM-DD HH:mm"),
  });

  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error?.message,
      date: moment().format("YYYY-MM-DD HH:mm"),
    });
  }

  return response.status(500).json({
    status: "error",
    message: "Internal server error",
    date: moment().format("YYYY-MM-DD HH:mm"),
  });
}

export { ErrorHandler };
