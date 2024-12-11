// view-modal-store.ts
import { StateCreator } from "zustand";
import { Recipes } from "./recipe-store";


type ViewModalState = {
  viewOpen: boolean;
  data: Recipes | null;
};

type ViewModalFunctions = {
  openViewModal: (data: Recipes) => void;
  closeViewModal: () => void;
};

export type ViewModalStore = ViewModalState & ViewModalFunctions;

export const useViewModalStore: StateCreator<
  ViewModalStore,
  [["zustand/immer", never]],
  [],ViewModalStore> = (set) => ({
  viewOpen: false,
  data: null,
  openViewModal: (data) => {
    set({ viewOpen: true, data });
  },
  closeViewModal: () => {
    set({ viewOpen: false, data: null });
  },
})