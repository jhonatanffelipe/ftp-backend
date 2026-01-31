import { Request, Response } from "express";
import UserService from "../services/UserService";

export default class UserController {
  public async create(request: Request, response: Response) {
    const { name, username, password, roleId } = request.body;

    const userService = new UserService();

    await userService.create({ name, username, password, roleId });

    return response
      .status(201)
      .json({ message: "Usuário registrado com sucesso" });
  }
}
