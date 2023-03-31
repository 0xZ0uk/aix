import React from "react";
import { BaseComponent } from "./core";
import { cn } from "./Utils";

export type AIXAuthorRole = "assistant" | "system" | "user";

export type Message = {
  content: string;
  role: AIXAuthorRole;
};

interface AIXOutputContainerProps extends BaseComponent {
  messages: Message[];
  hint?: string;
  colorsUser?: string;
  colorsAssistant?: string;
}

export const AIXOutputContainer: React.FC<AIXOutputContainerProps> = ({
  className,
  messages,
  colorsAssistant,
  colorsUser,
  hint,
}) => {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="w-full text-center">
        <p className="font-sans text-black/50 dark:text-white/50">{hint}</p>
      </div>
      {messages
        .filter((msg: Message) => msg.role !== "system")
        .map((msg: Message, i) => {
          if (msg.role === "assistant") {
            return (
              <AIXOutput
                key={i}
                className={cn("rounded-r-md", colorsAssistant)}
                {...msg}
              />
            );
          } else {
            return (
              <AIXOutput
                key={i}
                className={cn("rounded-l-md self-end", colorsUser)}
                {...msg}
              />
            );
          }
        })}
    </div>
  );
};

interface AIXOutputProps extends BaseComponent, Message {}

export const AIXOutput: React.FC<AIXOutputProps> = ({ className, content }) => {
  return (
    <div className={cn("p-4 w-fit rounded-t-md font-sans", className)}>
      <p>{content}</p>
    </div>
  );
};
