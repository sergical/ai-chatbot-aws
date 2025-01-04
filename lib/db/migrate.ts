import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

import { Resource } from "sst";

const runMigrate = async () => {
  if (!Resource.AIChatbotAWSDatabase.host) {
    throw new Error("SST Resource for DB is not defined");
  }

  const connection = postgres(
    `postgres://${Resource.AIChatbotAWSDatabase.username}:${Resource.AIChatbotAWSDatabase.password}@${Resource.AIChatbotAWSDatabase.host}:${Resource.AIChatbotAWSDatabase.port}/${Resource.AIChatbotAWSDatabase.database}`,
    { max: 1 }
  );

  const db = drizzle(connection);

  console.log("⏳ Running migrations...");

  const start = Date.now();
  await migrate(db, { migrationsFolder: "./lib/db/migrations" });
  const end = Date.now();

  console.log("✅ Migrations completed in", end - start, "ms");
  process.exit(0);
};

runMigrate().catch((err) => {
  console.error("❌ Migration failed");
  console.error(err);
  process.exit(1);
});
