import bcrypt from "bcryptjs";
import { randomUUID } from "node:crypto";
import { db } from "./db";

async function insertRoles() {
  const database = await db;

  const roles = [
    { id: "ADMIN", name: "Administrator" },
    { id: "USER", name: "Usuário Padrão" },
  ];

  for (const roleName of roles) {
    const roleExists = await database.get("SELECT * FROM roles WHERE id = ?", [
      roleName.id,
    ]);

    if (!roleExists) {
      await database.run("INSERT INTO roles (id, name) VALUES (?, ?)", [
        roleName.id,
        roleName.name,
      ]);
    }
  }
}

async function insertAdminUser() {
  const database = await db;

  const adminExists = await database.get(
    "SELECT * FROM users WHERE username = ?",
    ["admin"],
  );

  if (!adminExists) {
    const hashedPassword = await bcrypt.hash("Everest@123", 10);

    await database.run(
      "INSERT INTO users (id, username, name, password, roleId) VALUES (?, ?, ?, ?, ?)",
      [randomUUID(), "admin", "Administrador", hashedPassword, "ADMIN"],
    );
  }
}

export async function seedRun() {
  await insertRoles();

  await insertAdminUser();
}
