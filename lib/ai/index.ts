import { experimental_wrapLanguageModel as wrapLanguageModel } from "ai";

import { customMiddleware } from "./custom-middleware";

import { createAmazonBedrock } from "@ai-sdk/amazon-bedrock";

import { Resource } from "sst";

const bedrock = createAmazonBedrock({
  bedrockOptions: {
    region: "us-east-1",
    credentials: {
      accessKeyId: Resource.BedrockAccessKeyId.value,
      secretAccessKey: Resource.BedrockSecretAccessKey.value,
    },
  },
});

export const customModel = (apiIdentifier: string) => {
  return wrapLanguageModel({
    model: bedrock(apiIdentifier),
    middleware: customMiddleware,
  });
};
