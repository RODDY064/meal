// view-modal-store.ts
import { StateCreator } from "zustand";
import { FetchRecipes } from "./recipe-store";
import { Store } from "./store";


type ViewModalState = {
  viewOpen: boolean;
  viewData: FetchRecipes | null;
};

type ViewModalFunctions = {
  openViewModal: (viewData: FetchRecipes) => void;
  closeViewModal: () => void;
};

export type ViewModalStore = ViewModalState & ViewModalFunctions;

export const useViewModalStore: StateCreator<
  Store,
  [["zustand/immer",never]],
  [],ViewModalStore> = (set) => ({
  viewOpen: false,
  viewData:null ,
  openViewModal: (viewData) => {
    set({ viewOpen: true, viewData });
  },
  closeViewModal: () => {
    set({ viewOpen: false, viewData: null });
  },
})