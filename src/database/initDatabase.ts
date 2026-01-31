import { migrationRun } from "./migrationRun";
import { seedRun } from "./seedRun";

export async function initDatabase() {
  await migrationRun();
  await seedRun();
}
