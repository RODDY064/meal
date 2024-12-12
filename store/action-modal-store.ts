import { StateCreator } from "zustand";
import { FetchRecipes, Recipes } from "./recipe-store";
import { createClient } from "@/utils/supabase/client";
import { Store } from "./store";

const supabase =  createClient();


// action modal store to create and edit recipes


// action modal state
type ActionModalState = {
  isOpen: boolean;
  type: "create" | "edit";
};

// action modal functions
type ActionModalFuctions = {
  openModal: (type: "create" | "edit", recipes: Recipes | null) => void;
  closeModal: (ype: "create" | "edit") => void;
  createRecipe: (recipe: Recipes) => Promise<void>;
  editRecipe: (recipe: FetchRecipes) => Promise<void>;
};

// action modal store type
export type ActionModalStore = ActionModalState & ActionModalFuctions;

// action modal store hooks
export const useActionModalStore: StateCreator<
  Store,
  [["zustand/immer", never]],
  [],
  ActionModalStore> = (set) => ({

  isOpen: false,
  type: "create",

  openModal: (type,) => {
    set({ isOpen: true, type });
  },
  closeModal: (type) => {
    set({ isOpen: false, type: type, instructions:[]});
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
    const { data, error } = await supabase
      .from('recipes')
      .update(recipe)
      .eq('id', recipe.id);

    if (error) {
      console.log(error);
      throw new Error("Failed to update recipe");
    }
  },
});
