import { User } from "@supabase/supabase-js";
import { type  StateCreator } from "zustand";
import { createClient } from "@/utils/supabase/client";
import { Store } from "./store";
// import { v4 as uuidv4 } from 'uuid';

const supabase = createClient();

export type UserStore = {
  user: any ;
  getUser: () => Promise<void>;
};

export const useUser: StateCreator<
  Store,
  [["zustand/immer", never]],
  [],
  UserStore> = (set) => ({
  user: null, // Initialize the user state as null
  getUser: async () => {
    try {
      const { data, error } = await supabase.auth.getUser();
      if (error) throw error;

      set((state) => {
        state.user = data?.user ?? null;
      });
    } catch (err) {
      console.error("Error fetching user:", err);
      set((state) => {
        state.user = null; // Reset to null on error
      });
    }
  },
});
