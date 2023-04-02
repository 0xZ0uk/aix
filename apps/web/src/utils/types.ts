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

export type Product = {
  id: number;
  title: string;
  image: string;
  description: string;
  size: string[];
  color: string;
  price: number;
  type: string;
  [key: string]: number | string | string[];
};
