import React, { ReactElement } from "react";
import { useConversationStore } from "~/utils/stores/conversation";
import { ChatMessage, Conversation, Viewport } from "@aix/ui";
import { cn } from "@aix/ui/src/Utils";
import { ChatCompletionRequestMessage } from "openai";
import { useActionsQueue } from "~/utils/stores/actions";
import Head from "next/head";

interface LayoutProps {
  className?: string;
  children: ReactElement | ReactElement[];
}

const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  const { input, messages, onChangeInput, onAddMessage, onClearChat } =
    useConversationStore();

  const { onPushToQueue } = useActionsQueue();

  const handleSend = (msg: ChatMessage) => {
    const action = msg.action;

    if (!!action) {
      onPushToQueue(action);
    }

    const message = {
      role: msg.role,
      content: msg.content,
    } as ChatCompletionRequestMessage;

    onAddMessage(message);
  };

  return (
    <>
      <Head>
        <title>AIX Demo</title>
        <meta
          name="description"
          content="[WIP] AI Expericene - ChatGPT driven user experience."
          key="desc"
        />
        <meta property="og:title" content="AIX Demo" />
        <meta
          property="og:description"
          content="[WIP] AI Expericene - ChatGPT driven user experience."
        />
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1"
        />
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main className="flex overflow-hidden">
        <Conversation
          messages={messages}
          userMsg={input}
          hint="Hint: Ask for sneakers matching your size, prefered color, or any other thing you want"
          onChangeUserMsg={onChangeInput}
          onSend={handleSend}
          onClear={onClearChat}
        />
        <Viewport
          className={cn("overflow-y-auto w-2/3 absolute right-0", className)}
        >
          {children}
        </Viewport>
      </main>
    </>
  );
};

export default Layout;
