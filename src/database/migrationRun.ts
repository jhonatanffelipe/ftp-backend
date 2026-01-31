import { db } from "./db";

export async function migrationRun() {
  const database = await db;

  await database.exec(`
    CREATE TABLE IF NOT EXISTS roles (
      id TEXT UNIQUE NOT NULL PRIMARY KEY,
      name TEXT UNIQUE NOT NULL
    );
  `);

  await database.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY NOT NULL,
      username TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      password TEXT NOT NULL,
      roleId TEXT NOT NULL,
      FOREIGN KEY (roleId) REFERENCES roles(id)
    );
  `);

  await database.exec(`
    CREATE TABLE IF NOT EXISTS userSessions (
      id UUID PRIMARY KEY NOT NULL,
      userId UUID NOT NULL,
      token TEXT NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id)
    );
  `);
}
