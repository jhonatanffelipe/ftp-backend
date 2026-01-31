import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UsersRepository from "../database/repositories/UserRepository";
import User from "../database/entities/User";
import { AppError } from "../shared/error/AppError";

interface LoginParams {
  username: string;
  password: string;
}

export default class UserService {
  public async create({
    name,
    username,
    password,
    roleId,
  }: User): Promise<User> {
    const userRepository = new UsersRepository();
    try {
      const userExists = await userRepository.findUserByUsername(username);

      if (userExists) {
        throw new AppError("Usuário já existe", 409);
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new User({
        username,
        name,
        password: hashedPassword,
        roleId,
      });

      await userRepository.insertUser(user);

      return user;
    } catch (error: any) {
      throw new AppError(error.message, 500);
    }
  }
}
