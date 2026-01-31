import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../error/AppError";
import UserSessionRepository from "../database/repositories/UserSessionRepository";

export async function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ message: "Token não fornecido" });
  }

  const [, token] = authHeader.split(" ");

  if (!token) {
    return response.status(401).json({ message: "Token inválido" });
  }

  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    throw new AppError("JWT_SECRET não está definido", 500);
  }

  try {
    jwt.verify(token, JWT_SECRET);
  } catch (_) {
    throw new AppError(
      "Sua sessão expirou. Faça login novamente para continuar.",
      401,
    );
  }

  const userSessionRepository = new UserSessionRepository();

  const userSession = await userSessionRepository.findByToken(token);

  if (!userSession) {
    throw new AppError(
      "Sua sessão expirou. Faça login novamente para continuar.",
      401,
    );
  }

  next();
}
