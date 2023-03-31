import {
  AIXInput,
  AIXOutputContainer,
  AIXConversation,
  Message,
} from "@aix/ui";
import { RxPaperPlane } from "react-icons/rx";
import { useConversationStore } from "~/utils/stores";

export default function Web() {
  const { input, messages, onChangeInput, onAddMessage } =
    useConversationStore();

  return (
    <div className="flex">
      <AIXConversation
        className="bg-slate-200"
        system="Pretend you're a talking cat"
      >
        <AIXOutputContainer
          hint="Search for anything"
          colorsAssistant="bg-slate-400 text-white"
          colorsUser="bg-sky-500 text-white"
          messages={messages}
        />
        <AIXInput
          className="bg-transparent font-sans border-2 border-slate-400 rounded-md p-2"
          icon={<RxPaperPlane />}
          value={input}
          onChange={onChangeInput}
          onSend={onAddMessage}
        />
      </AIXConversation>
    </div>
  );
}
