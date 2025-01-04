// Define your models here.

export interface Model {
  id: string;
  label: string;
  apiIdentifier: string;
  description: string;
}

export const models: Array<Model> = [
  {
    id: "amazon.nova-pro-v1:0",
    label: "Amazon Nova Pro",
    apiIdentifier: "amazon.nova-pro-v1:0",
    description:
      "Nova Pro is a multimodal understanding foundation model. It is multilingual and can reason over text, images and videos.",
  },
  {
    id: "anthropic.claude-3-5-sonnet-20241022-v2:0",
    label: "Claude 3.5 Sonnet",
    apiIdentifier: "anthropic.claude-3-5-sonnet-20241022-v2:0",
    description:
      "The upgraded Claude 3.5 Sonnet is now state-of-the-art for a variety of tasks including real-world software engineering, agentic capabilities and computer use. The new Claude 3.5 Sonnet delivers these advancements at the same price and speed as its predecessor.",
  },
] as const;

export const DEFAULT_MODEL_NAME: string = "amazon.nova-pro-v1:0";
