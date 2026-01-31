import { db } from "../../shared/database/db";
import User from "../entities/User";

export default class UsersRepository {
  public findUserByUsername = async (username: string): Promise<User> => {
    const database = await db;

    const user = await database.get("SELECT * FROM users WHERE username = ?", [
      username,
    ]);
    return user as User;
  };

  public insertUser = async (user: User): Promise<void> => {
    const database = await db;

    await database.run(
      "INSERT INTO users (id, username, name, password, roleId) VALUES (?, ?, ?, ?, ?)",
      [user.id, user.username, user.name, user.password, user.roleId],
    );
  };
}
