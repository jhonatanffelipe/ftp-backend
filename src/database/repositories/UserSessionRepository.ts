import { db } from "../db";
import UserSession from "../entities/UserSession";

export default class UserSessionRepository {
  public findByUserId = async (userId: string): Promise<UserSession> => {
    const database = await db;

    const userSession = await database.get(
      "SELECT * FROM userSessions WHERE userId = ?",
      [userId],
    );
    return userSession as UserSession;
  };

  public findByToken = async (token: string): Promise<UserSession> => {
    const database = await db;

    const userSession = await database.get(
      "SELECT * FROM userSessions WHERE token = ?",
      [token],
    );
    return userSession as UserSession;
  };

  public insertUserSession = async (
    userSession: UserSession,
  ): Promise<void> => {
    const database = await db;

    await database.run(
      "INSERT INTO userSessions (id, userId, token, createdAt) VALUES (?, ?, ?, ?)",
      [
        userSession.id,
        userSession.userId,
        userSession.token,
        userSession.createdAt,
      ],
    );
  };
}
