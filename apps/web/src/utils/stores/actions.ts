import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type ActionTypes = "GET_ITEMS" | "GET_ITEMS_WITH_FILTER" | "ADD_CART";

export type Action = {
  name: ActionTypes;
  parameters: any;
};

interface ActionsQueueState {
  queue: Action[];
  onPushToQueue: (action: Action) => void;
  onClearAction: (name: ActionTypes) => void;
  onClearActions: () => void;
}

export const useActionsQueue = create<ActionsQueueState>()(
  devtools((set) => ({
    queue: [],
    onPushToQueue: (action: Action) =>
      set((state: ActionsQueueState) => ({
        ...state,
        queue: [...state.queue, action],
      })),
    onClearAction: (name: ActionTypes) =>
      set((state: ActionsQueueState) => ({
        ...state,
        queue: state.queue.filter((a: Action) => a.name !== name),
      })),
    onClearActions: () =>
      set((state: ActionsQueueState) => ({ ...state, queue: [] })),
  }))
);
