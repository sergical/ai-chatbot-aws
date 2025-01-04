/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "ai-chatbot-aws",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
      providers: {
        aws: {
          profile:
            input.stage === "production" ? "serg-production" : "serg-dev",
        },
      },
    };
  },
  async run() {
    // Secrets for AWS Bedrock
    const bedrockAccessKeyId = new sst.Secret(
      "BedrockAccessKeyId",
      "placeholder"
    );
    const bedrockSecretAccessKey = new sst.Secret(
      "BedrockSecretAccessKey",
      "placeholder"
    );
    const authSecret = new sst.Secret("AuthSecret", "placeholder");

    const vpc = new sst.aws.Vpc("AIChatbotAWSVPC", {
      bastion: true,
      nat: "ec2",
    });
    const database = new sst.aws.Postgres.v1("AIChatbotAWSDB", { vpc });

    const bucket = new sst.aws.Bucket("AIChatbotAWSBucket", {
      access: "public",
    });

    new sst.aws.Nextjs("AIChatbotAWS", {
      domain: {
        name: "aws-chat-app.serg.tech",
        dns: sst.cloudflare.dns(),
      },
      link: [
        database,
        bedrockAccessKeyId,
        bedrockSecretAccessKey,
        authSecret,
        bucket,
      ],
    });

    new sst.x.DevCommand("AIChatbotAWSStudio", {
      link: [database],
      dev: {
        command: "npx drizzle-kit studio",
      },
    });
  },
});
