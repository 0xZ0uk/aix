import { ChatCompletionRequestMessageRoleEnum } from "openai";

export type Message = {
  role: ChatCompletionRequestMessageRoleEnum;
  content: string;
};
