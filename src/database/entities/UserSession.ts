import moment from "moment";
import { randomUUID } from "node:crypto";

export default class UserSession {
  id?: string;
  userId: string;
  token: string;
  createdAt?: string;

  constructor({ userId, token, id }: UserSession) {
    this.userId = userId;
    this.token = token;
    this.createdAt = moment().toISOString();
    this.id = id ?? randomUUID();
  }
}
