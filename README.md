<a href="https://aws-chat-app.serg.tech/">
  <img alt="Next.js 14 and App Router-ready AI chatbot." src="app/opengraph-image.png">
  <h1 align="center">Next.js AI Chatbot on AWS</h1>
</a>

<p align="center">
  An Open-Source AI Chatbot Template Built With Next.js and the AI SDK by Vercel. Deployed on AWS using SST. LLM provider: AWS Bedrock.
</p>

<p align="center">
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#model-providers"><strong>Model Providers</strong></a> ·
  <a href="#deploy-your-own"><strong>Deploy Your Own</strong></a> ·
  <a href="#running-locally"><strong>Running locally</strong></a>
</p>
<br/>

## Features

- [Next.js](https://nextjs.org) App Router
  - Advanced routing for seamless navigation and performance
  - React Server Components (RSCs) and Server Actions for server-side rendering and increased performance
- [SST](https://sst.dev/)
  - SST is a framework for building serverless applications. It provides a set of tools and libraries for building, deploying, and managing serverless applications.
  - SST is used to deploy the application to AWS.
- [AI SDK](https://sdk.vercel.ai/docs)
  - Unified API for generating text, structured objects, and tool calls with LLMs
  - Hooks for building dynamic chat and generative user interfaces
  - Supports AWS Bedrock
- [shadcn/ui](https://ui.shadcn.com)
  - Styling with [Tailwind CSS](https://tailwindcss.com)
  - Component primitives from [Radix UI](https://radix-ui.com) for accessibility and flexibility
- Data Persistence
  - [AMAZON RDS](https://aws.amazon.com/rds/) for saving chat history and user data
  - [AMAZON S3](https://aws.amazon.com/s3/) for efficient file storage
- [NextAuth.js](https://github.com/nextauthjs/next-auth)
  - Simple and secure authentication

## Model Providers

This template ships with Nova Pro `amazon.nova-pro-v1:0` as the default using AWS Bedrock. However, with the [AI SDK](https://sdk.vercel.ai/docs), you can switch LLM providers to [OpenAI](https://openai.com), [Anthropic](https://anthropic.com), [Cohere](https://cohere.com/), and [many more](https://sdk.vercel.ai/providers/ai-sdk-providers) with just a few lines of code.

For AWS Bedrock, you need to create an IAM role with the following user policies: `AmazonBedrockFullAccess`;

Then in the dashboard you need to enable the `amazon.nova-pro-v1:0` model and any other models you want to use.

Make sure you set your Bedrock credentials using SST Secrets. [See here](https://sst.dev/docs/environment-variables).

## Deploy Your Own

We're deploying to AWS using [SST](https://sst.dev/), read more about how to set up your environment variables [here](https://sst.dev/docs/environment-variables).

```bash
sst deploy --stage dev / production
```

## Running locally

- Configure your AWS credentials and CLI. Follow the instructions [here](https://sst.dev/docs/aws-accounts).
- Configure your AWS Bedrock credentials. Follow Model Provider instructions above.
- Setup your environment variables (see sst.config.ts)
- Run `pnpm install` to install the dependencies
- Run `sst dev` to start the development server

Your app template should now be running on [localhost:3000](http://localhost:3000/).
