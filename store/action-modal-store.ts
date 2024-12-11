import { create, StateCreator } from "zustand";
import { User } from "@supabase/supabase-js";
import { Recipes } from "./recipe-store";
import { createClient } from "@/utils/supabase/client";
import { useBoundStore } from "./store";

const supabase =  createClient();


// action modal store to create and edit recipes


// action modal state
type ActionModalState = {
  isOpen: boolean;
  type: "create" | "edit";
  recipes: Recipes | null;
};

// action modal functions
type ActionModalFuctions = {
  openModal: (type: "create" | "edit", recipes: Recipes | null) => void;
  closeModal: () => void;
  createRecipe: (recipe: Recipes) => Promise<void>;
  editRecipe: (recipe: Recipes) => Promise<void>;
  setPulic: (recipe: Recipes) => void;
};

// action modal store type
export type ActionModalStore = ActionModalState & ActionModalFuctions;
// action modal store hooks
export const useActionModalStore: StateCreator<
  ActionModalStore,
  [["zustand/immer", never]],
  [],
  ActionModalStore> = (set) => ({
  isOpen: false,
  type: "create",
  recipes: null,
  openModal: (type, recipes) => {
    set({ isOpen: true, type, recipes:null});
  },
  closeModal: () => {
    set({ isOpen: false, type: "create", recipes: null });
  },
  createRecipe: async (recipe) => {
    // create recipe
    try {
      const { data, error } = await supabase
    .from('recipes')
    .insert([
      {
        ...recipe,
        ingredients:"",
        image_url: '',
        is_public: true,
        public_link: '',
      },
    ]);

    if(error) {
      console.log(error);
      throw new Error("Something went wrong")
    }
      
    } catch (error) {
       throw new Error("Something went wrong");
    }},
  editRecipe: async (recipe) => {
    // edit recipe
    console.log(recipe);
  },
  setPulic: (recipe) => {
    // set recipe to public
    console.log(recipe);
  },
});
