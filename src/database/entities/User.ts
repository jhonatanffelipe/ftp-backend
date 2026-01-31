import { randomUUID } from "node:crypto";

export default class User {
  id?: string;
  username: string;
  name: string;
  password: string;
  roleId: string;

  constructor({ username, name, password, roleId, id }: User) {
    this.username = username;
    this.name = name;
    this.password = password;
    this.roleId = roleId;
    this.id = id ?? randomUUID();
  }
}
