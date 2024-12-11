import { User } from "@supabase/supabase-js";
import { StateCreator } from "zustand";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export type UserStore = {
  user: User | null;
  getUser: () => Promise<void>;
};

export const useUser: StateCreator<
  UserStore,
  [["zustand/immer", never]],
  []
> = (set) => ({
  user: null, // Initialize the user state as null
  getUser: async () => {
    try {
      const { data, error } = await (await supabase).auth.getUser();
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
