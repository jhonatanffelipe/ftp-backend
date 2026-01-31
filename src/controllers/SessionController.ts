import { Request, Response } from "express";
import SessionService from "../services/SessionService";

export default class SessionController {
  public async create(request: Request, response: Response) {
    const { username, password } = request.body;

    const sessionService = new SessionService();

    const token = await sessionService.create({ username, password });

    return response.status(200).json({ token });
  }
}
