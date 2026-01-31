import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UsersRepository from "../database/repositories/UserRepository";
import { AppError } from "../error/AppError";
import UserSessionRepository from "../database/repositories/UserSessionRepository";
import UserSession from "../database/entities/UserSession";

interface LoginParams {
  username: string;
  password: string;
}

export default class SessionService {
  public async create({ username, password }: LoginParams): Promise<string> {
    const userRepository = new UsersRepository();
    const userSessionRepository = new UserSessionRepository();

    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      throw new AppError("JWT_SECRET não está definido", 500);
    }

    const user = await userRepository.findUserByUsername(username);

    if (!user) {
      throw new AppError("Usuário ou senha inválidos", 401);
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Usuário ou senha inválidos", 401);
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.roleId },
      JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    const userSession = new UserSession({
      userId: user.id!,
      token,
    });

    await userSessionRepository.insertUserSession(userSession);

    return token;
  }
}
