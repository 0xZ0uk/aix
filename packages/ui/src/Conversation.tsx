import { Configuration, OpenAIApi } from "openai";
import React, { ReactElement } from "react";
import { BaseComponent } from "./core";
import { AIXInput } from "./Input";
import { Message } from "./Output";
import { useAIXContext } from "./Provider";
import { cn } from "./Utils";

interface AIXConversationProps extends BaseComponent {
  system: string;
}

export const AIXConversation: React.FC<AIXConversationProps> = ({
  children,
  className,
  system,
}) => {
  return (
    <div
      className={cn(
        "h-screen w-1/3 p-4 flex flex-col justify-between",
        className
      )}
    >
      {children}
    </div>
  );
};
