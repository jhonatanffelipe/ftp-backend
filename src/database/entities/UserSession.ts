import { randomUUID } from "node:crypto";

export default class UserSession {
  id?: string;
  userId: string;
  token: string;
  createdAt?: Date;

  constructor({ userId, token, createdAt, id }: UserSession) {
    this.userId = userId;
    this.token = token;
    this.createdAt = createdAt ?? new Date();
    this.id = id ?? randomUUID();
  }
}
