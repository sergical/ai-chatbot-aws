import { Resource } from "sst";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./lib/db/schema.ts",
  out: "./lib/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    host: Resource.AIChatbotAWSDatabase.host,
    port: Resource.AIChatbotAWSDatabase.port,
    user: Resource.AIChatbotAWSDatabase.username,
    password: Resource.AIChatbotAWSDatabase.password,
    database: Resource.AIChatbotAWSDatabase.database,
  },
});
