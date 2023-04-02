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

export interface AppResponse {
  action:
    | {
        name: string;
        parameters: Record<string, any>;
      }
    | undefined;
  message: string;
}

export function parseAppResponse(
  message: ChatCompletionResponseMessage
): AppResponse {
  const jsonResponse = message.content;
  const prefix = "JSON: ";
  const startIndex = jsonResponse.indexOf(prefix);
  const trimmedResponse =
    startIndex === -1
      ? jsonResponse
      : jsonResponse.substring(startIndex + prefix.length);

  try {
    const response: AppResponse = JSON.parse(trimmedResponse);
    return response;
  } catch (e) {
    return { action: undefined, message: "Error parsing app response" };
  }
}
