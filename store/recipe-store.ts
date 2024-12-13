import { StateCreator } from "zustand";
import { createClient } from "@/utils/supabase/client";
import { Store } from "./store";

const supabase = createClient();

// recipe types
export type Recipes = {
  title: string;
  tags: string[];
  category: string;
  description: string;
  ingredients?: string;
  instructions: string[];
  is_public?: boolean;
  user_id: string | null;
  publicLink?: string;
} | null;

// fecth recipes types

export type FetchRecipes = Recipes & {
  id: string | undefined;
  image_url: string;
};

export type RecipeFunction = {
  recipeStatus: "idle" | "loading" | "error" | "success";
  isDelected: boolean;
  publicRecipes: FetchRecipes[];
  singleRecipe: FetchRecipes | null;
  userRecipes: FetchRecipes[];
  removeRecipe: (id: string) => Promise<void>;
  setPublic: (id: string) => Promise<void>;
  getPublicRecipes: () => Promise<void>;
  getUserRecipes: (user_id: string) => Promise<void>;
  recipesMessages?: string;
  dataUpdated: boolean;
  refeshData: () => void;
  getSingleRecipe: (id: string) => Promise<void>;
  setPublicLink: (id: string,link:string) => Promise<void>;
};

export type RecipeStore = RecipeFunction;

export const useRecipeStore: StateCreator<
  Store,
  [["zustand/immer", never]],
  [],
  RecipeStore
> = (set) => ({
  dataUpdated: false,
  isDelected: false,
  recipeStatus: "loading",
  publicRecipes: [],
  userRecipes: [],
  singleRecipe: null,
  removeRecipe: async (id) => {
    set((state) => ({
      ...state,
      isDelected: false,
    }));
    try {
      const { error } = await supabase.from("recipes").delete().eq("id", id);

      if (error) {
        set((state) => ({
          ...state,
        }));

        throw error;
      }

      set((state) => ({
        ...state,
        isDelected: true,
      }));

      set((state) => ({
        dataUpdated: !state.dataUpdated,
      }));
    } catch (error: any) {
      console.error("Error removing recipe:", error.message);
    }
  },

  setPublic: async (id) => {
    set((state) => ({
      ...state,
    }));

    try {
      const { data, error } = await supabase
        .from("recipes")
        .update({ is_public: true })
        .eq("id", id);

      if (error) {
        throw error;
      }

      set((state) => ({
        dataUpdated: !state.dataUpdated,
      }));
    } catch (error: any) {
      console.error("Error setting public status:", error.message);
    }
  },

  // public recpies fetch

  getPublicRecipes: async () => {
    set((state) => ({
      ...state,
      recipeStatus: "loading",
      publicRecipes: null,
    }));

    try {
      // delay 1-second  before making the fetch request
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const { data, error } = await supabase
        .from("recipes")
        .select("*")
        .eq("is_public", true);

      if (error) {
        throw error;
      }

      console.log(data,'data');

      set((state) => ({
        ...state,
        recipeStatus: "success",
        publicRecipes: data,
      }));
    } catch (error: any) {
      console.error("Error fetching public recipes:", error.message);
      set((state) => ({
        ...state,
        recipeStatus: "error",
        recipesMessages: error.message,
      }));
    }
  },

  // user recipe fetch

  getUserRecipes: async (user_id: string) => {
    set((state) => ({
      ...state,
      recipeStatus: "loading",
      userRecipes: null,
    }));

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (!user_id) {
        throw new Error("fail to fetch user recipes");
      }

      const { data, error } = await supabase
        .from("recipes")
        .select("*")
        .eq("user_id", user_id);

      if (error) {
        throw error;
      }

      set((state) => ({
        ...state,
        recipeStatus: "success",
        userRecipes: data,
      }));
    } catch (error: any) {
      console.error("Error fetching user recipes:", error.message);
      set((state) => ({
        ...state,
        recipeStatus: "error",
        recipesMessages: error.message,
      }));
    }
  },
  // refresh the data
  refeshData: () => {
    set((state) => ({
      dataUpdated: !state.dataUpdated,
    }));
  },
  getSingleRecipe: async (id) => {
    set((state) => ({
      recipeStatus: "loading",
    }));

    try {
      const { data, error } = await supabase
        .from("recipes")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        throw error;
      }
      // console.log(data)

      set((state) => ({
        recipeStatus: "success",
        singleRecipe: data,
      }));
    } catch (error: any) {
      console.error("Error fetching single recipe:", error.message);
      set((state) => ({
        recipeStatus: "error",
        recipesMessages: error.message,
      }));
    }
  },
  setPublicLink: async (id,link) => {
    set((state) => ({
      ...state,
    }));
    const baseUrl = process.env.BaseUrl;
    const publicLink = `${baseUrl}/recipe/${id}`;

    try {
      const { data, error } = await supabase
        .from("recipes")
        .update({ publicLink })
        .eq("id", id);

        if(error){
          throw error
        }
    } catch (error) {
     console.log('error',error)
    }
  },
});
