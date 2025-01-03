import { bedrock } from "@ai-sdk/amazon-bedrock";
import { experimental_wrapLanguageModel as wrapLanguageModel } from "ai";

import { customMiddleware } from "./custom-middleware";

export const customModel = (apiIdentifier: string) => {
  return wrapLanguageModel({
    model: bedrock(apiIdentifier),
    middleware: customMiddleware,
  });
};
