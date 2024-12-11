import { StateCreator } from "zustand";
import { FetchRecipes } from "./recipe-store"; 

// Search store
export type SearchStore = {
  search: string; 
  category: string; 
  searchData: FetchRecipes[] | null; 
  setSearch: (search: string) => void; 
  setCategory: (category: string) => void;
  searching: (recipes: FetchRecipes[], search: string, category: string) => void; 
};

export const useSearchStore: StateCreator<
  SearchStore,
  [["zustand/immer", never]],
  [],
  SearchStore
> = (set) => ({
  search: "",
  category: "",
  searchData: null,


  setSearch: (search) => {
    set((state) => {
      state.search = search;
    });
  },

 
  setCategory: (category) => {
    set((state) => {
      state.category = category;
    });
  },


  searching: (recipes, search, category) => {
    set((state) => {
      state.search = search;
      state.category = category;

      // Filter recipes based on both search query and category
      state.searchData = recipes?.filter((recipe) => {
        const matchesTitle = recipe.title
          .toLowerCase()
          .includes(search.toLowerCase());
        const matchesCategory = category
          ? recipe.category.toLowerCase() === category.toLowerCase()
          : true; 
        return matchesTitle && matchesCategory;
      });
    });
  },
});
