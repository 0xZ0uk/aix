import { ChatCompletionRequestMessageRoleEnum } from "openai";
import { ReactElement } from "react";

export interface BaseComponent {
  className?: string;
  children?: ReactElement | ReactElement[];
}

export type Message = {
  role: ChatCompletionRequestMessageRoleEnum;
  content: string;
};

export type Route = {
  label: string;
  url: string;
};
