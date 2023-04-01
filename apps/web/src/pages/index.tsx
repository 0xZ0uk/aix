import Conversation from "@aix/ui/src/Conversation";
import { useConversationStore } from "~/utils/stores";

export default function Web() {
  const { input, messages, onChangeInput, onAddMessage } =
    useConversationStore();

  return (
    <div className="flex">
      <Conversation
        messages={messages}
        userMsg={input}
        onChangeUserMsg={onChangeInput}
        onSend={onAddMessage}
      />
    </div>
  );
}
