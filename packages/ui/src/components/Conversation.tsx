import {
  ChatCompletionRequestMessage,
  type ChatCompletionRequestMessageRoleEnum,
} from "openai";
import React from "react";
import { useAIXContext } from "./Provider";
import { cn, parseAppResponse } from "../Utils";
import { RxPaperPlane } from "react-icons/rx";

export interface ChatMessage extends ChatCompletionRequestMessage {
  action?: any;
}

interface ChatInputProps {
  input: string;
  className?: string;
  placeholder?: string;
  icon?: React.ReactElement;
  onChange: (value: string) => void;
  onSend: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  input,
  className,
  placeholder,
  icon,
  onChange,
  onSend,
}) => {
  return (
    <div className={cn("w-full flex", className)}>
      <input
        className="w-full bg-transparent p-2 outline-none"
        value={input}
        onChange={(e: any) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSend()}
        placeholder={placeholder}
      />
      {!!icon && (
        <div
          className="w-12 h-12 bg-slate-900 text-slate-50 rounded-md flex items-center justify-center text-xl cursor-pointer"
          onClick={onSend}
        >
          {icon}
        </div>
      )}
    </div>
  );
};

interface ChatBubbleProps extends ChatMessage {
  className?: string;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({
  role,
  content,
  className,
}) => {
  return (
    <div
      className={cn(
        "p-4 w-fit max-w-[90%] rounded-t-md font-sans",
        role === "system" && "hidden",
        role === "assistant" && "rounded-r-md",
        role === "user" && "rounded-l-md",
        className
      )}
    >
      {content}
    </div>
  );
};

interface ConversationProps {
  messages: ChatMessage[];
  userMsg: string;
  assistantClasses?: string;
  className?: string;
  userClasses?: string;
  hint?: string;
  onChangeUserMsg: (value: string) => void;
  onSend: (msg: ChatMessage) => void;
  onClear: () => void;
}

export const Conversation: React.FC<ConversationProps> = ({
  className,
  messages,
  userMsg,
  assistantClasses,
  userClasses,
  hint,
  onChangeUserMsg,
  onSend,
  onClear,
}) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const { onChatCompletion } = useAIXContext();

  const handleSend = async () => {
    onSend({
      role: "user",
      content: userMsg,
    });
    setLoading(true);

    const msgs = [
      ...messages,
      { role: "user", content: userMsg },
    ] as ChatCompletionRequestMessage[];
    const res = await onChatCompletion(msgs);

    const resMsg = {
      role: "assistant" as ChatCompletionRequestMessageRoleEnum,
      action:
        parseAppResponse(res.data.choices[0].message!)?.action || undefined,
      content:
        parseAppResponse(res.data.choices[0].message!)?.message ||
        res.data.choices[0].message!.content,
    };

    onSend(resMsg);
    setLoading(false);
  };

  return (
    <div
      className={cn(
        "h-screen w-1/3 p-4 flex flex-col justify-between fixed left-0",
        !!className ? className : "bg-slate-200"
      )}
    >
      <div className="flex flex-col gap-3 overflow-y-auto mb-4">
        {!!hint && (
          <div className="w-3/5 mx-auto my-8 text-center text-slate-500 text-xs">
            {hint}
          </div>
        )}
        {messages.map((msg: ChatCompletionRequestMessage) => (
          <ChatBubble
            className={cn(
              msg.role === "assistant"
                ? !!assistantClasses
                  ? assistantClasses
                  : "bg-slate-400 text-slate-50 self-start"
                : "",
              msg.role === "user"
                ? !!userClasses
                  ? userClasses
                  : "bg-sky-500 text-slate-50 self-end"
                : ""
            )}
            {...msg}
          />
        ))}
        {!!onClear && !loading && messages.length > 5 && (
          <button
            className="bg-transparent text-slate-600 underline w-fit h-fit text-xs mx-auto my-8"
            onClick={onClear}
          >
            Clear Chat
          </button>
        )}
        {loading && (
          <div
            className={cn(
              "p-4 w-1/2 flex flex-col gap-2 rounded-t-md rounded-r-md font-sans",
              !!assistantClasses
                ? assistantClasses
                : "bg-slate-400 text-slate-50"
            )}
          >
            <div className="w-full h-2 bg-slate-200 rounded-md animate-pulse"></div>
            <div className="w-3/4 h-2 bg-slate-200 rounded-md animate-pulse"></div>
          </div>
        )}
      </div>
      <div>
        <ChatInput
          input={userMsg}
          className="border-2 border-slate-400 p-2 rounded-md"
          onChange={onChangeUserMsg}
          onSend={handleSend}
          placeholder="Hello world"
          icon={<RxPaperPlane />}
        />
      </div>
    </div>
  );
};
