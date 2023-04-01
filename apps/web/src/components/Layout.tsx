import React, { ReactElement } from "react";
import { useConversationStore } from "~/utils/stores";
import { Conversation } from "@aix/ui";
import { cn } from "@aix/ui/src/Utils";

interface LayoutProps {
  className?: string;
  children: ReactElement | ReactElement[];
}

const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  const { input, messages, onChangeInput, onAddMessage, onClearChat } =
    useConversationStore();

  return (
    <main className="flex overflow-hidden">
      <Conversation
        messages={messages}
        userMsg={input}
        hint="Hint: If you fucking give up, you will achieve nothing. Respect your fucking craft."
        onChangeUserMsg={onChangeInput}
        onSend={onAddMessage}
        onClear={onClearChat}
      />
      <div className={cn("overflow-y-auto w-2/3 absolute right-0", className)}>
        {children}
      </div>
    </main>
  );
};

export default Layout;
