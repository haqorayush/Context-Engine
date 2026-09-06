import { customProvider } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { isTestEnvironment } from "../constants";
import { titleModel } from "./models";

const rawApiKey =
  process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY || "";
const cleanApiKey = rawApiKey.trim().replace(/^["']|["']$/g, "");

const isUsingOpenRouter = Boolean(process.env.OPENROUTER_API_KEY);
const defaultBaseUrl = isUsingOpenRouter
  ? "https://openrouter.ai/api/v1"
  : "https://api.openai.com/v1";

const openai = createOpenAI({
  apiKey: cleanApiKey || undefined,
  baseURL:
    process.env.OPENROUTER_BASE_URL ||
    process.env.OPENAI_BASE_URL ||
    defaultBaseUrl,
  headers: {
    ...(process.env.NEXT_PUBLIC_APP_URL && {
      "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL,
    }),
    "X-Title": "Context Engine",
  },
});

export const myProvider = isTestEnvironment
  ? (() => {
      const { chatModel, titleModel } = require("./models.mock");
      return customProvider({
        languageModels: {
          "chat-model": chatModel,
          "title-model": titleModel,
        },
      });
    })()
  : null;

export function getLanguageModel(modelId: string) {
  if (isTestEnvironment && myProvider) {
    return myProvider.languageModel(modelId);
  }

  return openai.chat(modelId);
}

export function getTitleModel() {
  if (isTestEnvironment && myProvider) {
    return myProvider.languageModel("title-model");
  }
  return openai.chat(titleModel.id);
}
