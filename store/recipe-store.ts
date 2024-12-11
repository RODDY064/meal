import { StateCreator } from "zustand";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

// recipe types
export type Recipes = {
    title: string;
    tags: string[];
    category: string;
    description: string;
    ingredients?: string;
    instructions: string[];
    isPublic?: boolean;
    user_id: string | null;
    publicLink?: string;
  } | null;


  // fecth recipes types

  export type FetchRecipes = Recipes & {
    id: string;
    image_url: string;
  }


   export type RecipeFunction = {
    recipeStatus: "idle" | "loading" | "error" | "success";
    recipes: FetchRecipes[];
    publicRecipes: FetchRecipes[];
    userRecipes: FetchRecipes[];
    removeRecipe: (id: string) => Promise<void>;
    setPublic: (id: string) => Promise<void>;
    getPublicRecipes: () => Promise<void>;
    getUserRecipes: (user_id:string) => Promise<void>;
    recipesMessages?: string;

  }

  export type RecipeStore = RecipeFunction;

export const useRecipeStore: StateCreator<RecipeStore, [["zustand/immer", never]], [], RecipeStore> = (set) => ({
  recipeStatus: "idle",
  recipes: [],
  publicRecipes: [],
  userRecipes: [],
  removeRecipe: async(id) => {
    set((state) => ({
      recipes: state.recipes.filter((recipe) => recipe.id !== id),
    }));
  },
  setPublic: async (id) => {
    set((state) => ({
      recipes: state.recipes.map((recipe) =>
        recipe.id === id ? { ...recipe, isPublic: !recipe.isPublic } : recipe
      ),
    }));},
    getPublicRecipes: async () => {
      set((state) => {
        // fetch public recipes
        return {
          ...state,
          recipeStatus: "loading", // Set the recipeStatus to loading
          publicRecipes: null, // Reset the state while fetching
        };
      });
    
      try {
        const { data, error } = await supabase
          .from("recipes")
          .select("*")
          .eq("is_public", true);
    
        if (error) {
          throw error;
        }
    
        set((state) => ({
          ...state,
          recipeStatus: "success", // Set the recipeStatus to success
          publicRecipes: data, // Store the fetched recipes in the state
        }));
    
      } catch (error:any) {
        console.error("Error fetching public recipes:", error.message );
        set((state) => ({
          ...state,
          recipeStatus: "error", // Set the recipeStatus to error
          recipesMessages: error.message, // Store the error message in the  message state
        }));
      }
    },
    getUserRecipes: async (user_id) => {
      // fetch user recipes
    },
});