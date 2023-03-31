import { Configuration, OpenAIApi } from "openai";
import { ReactElement } from "react";

export interface BaseComponent {
  className?: string;
  children?: ReactElement | ReactElement[];
}
