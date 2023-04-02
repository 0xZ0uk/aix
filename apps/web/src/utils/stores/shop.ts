import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { storeItems } from "../mock";
import { Product } from "../types";

interface ShopState {
  items: Product[];
  filterItems: (filters: Record<string, string>) => void;
  resetItems: () => void;
}

function filterProducts(
  items: Product[],
  filters: Record<string, string>
): Product[] {
  return items.filter((item) => {
    for (const filterKey in filters) {
      if (filterKey === "size") {
        if (!item[filterKey].includes(filters[filterKey]!)) {
          return false;
        }
      } else {
        if (item[filterKey] !== filters[filterKey]) {
          return false;
        }
      }
    }
    return true;
  });
}

export const useShop = create<ShopState>()(
  devtools((set) => ({
    items: storeItems,
    filterItems: (filters: Record<string, string>) =>
      set((state: ShopState) => ({
        ...state,
        items: filterProducts(state.items, filters),
      })),
    resetItems: () =>
      set((state: ShopState) => ({
        ...state,
        items: storeItems,
      })),
  }))
);
