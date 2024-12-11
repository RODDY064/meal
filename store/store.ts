// store.ts
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { useActionModalStore } from "./action-modal-store";
import { useViewModalStore } from "./view-modal-store";
import { ActionModalStore } from "./action-modal-store";
import { ViewModalStore } from "./view-modal-store";
import { UserStore, useUser } from "./user-store";
import { InstructionStore, useInstructionStore } from "./instructions";
import { RecipeStore, useRecipeStore } from "./recipe-store";
import { SearchStore, useSearchStore } from "./search-store";


export type Store = ActionModalStore & ViewModalStore & UserStore & InstructionStore & RecipeStore & SearchStore;

export const useBoundStore = create<Store>()(
  immer((...a) => ({
    ...useActionModalStore(...a),
    ...useViewModalStore(...a),
    ...useUser(...a),
    ...useInstructionStore(...a),
    ...useRecipeStore(...a),
    ...useSearchStore(...a),
  }))
);