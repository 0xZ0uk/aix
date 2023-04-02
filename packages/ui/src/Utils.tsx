import { ClassValue, clsx } from "clsx";
import { ChatCompletionResponseMessage } from "openai";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseGPTJSON(message: ChatCompletionResponseMessage) {
  if (message.role === "assistant") {
    if (message.content.includes("JSON:")) {
      const msg =
        message.content.split("JSON: ")[
          message.content.split("JSON: ").length - 1
        ];

      return JSON.parse(msg);
    }
  }

  return undefined;
}
