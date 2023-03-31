import { type Message } from "@aix/ui";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface ConversationState {
  loading: boolean;
  messages: Message[];
  input: string;
  onToggleLoading: () => void;
  onChangeInput: (value: string) => void;
  onAddMessage: (msg: Message) => void;
}

export const useConversationStore = create<ConversationState>()(
  devtools((set) => ({
    loading: false,
    messages: [
      { content: "Lorem ipsum dolar sit amet", role: "system" },
      { content: "Lorem ipsum dolar sit amet", role: "assistant" },
      { content: "Lorem ipsum dolar sit amet", role: "user" },
    ],
    input: "",
    onToggleLoading: () =>
      set((state: ConversationState) => ({
        ...state,
        loading: !state.loading,
      })),
    onChangeInput: (value: string) =>
      set((state: ConversationState) => ({ ...state, input: value })),
    onAddMessage: (msg: Message) =>
      set((state: ConversationState) => ({
        ...state,
        messages: [...state.messages, msg],
        input: "",
      })),
  }))
);
