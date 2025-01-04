import { Resource } from "sst";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./lib/db/schema.ts",
  out: "./lib/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    host: Resource.AIChatbotAWSDB.host,
    port: Resource.AIChatbotAWSDB.port,
    user: Resource.AIChatbotAWSDB.username,
    password: Resource.AIChatbotAWSDB.password,
    database: Resource.AIChatbotAWSDB.database,
  },
});
