import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Message } from "./types";

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
      {
        content: "Pretend you're Jarvis, Tony Stark's AI in Iron Man",
        role: "system",
      },
      { content: "Hello sir, how can I help you?", role: "assistant" },
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
