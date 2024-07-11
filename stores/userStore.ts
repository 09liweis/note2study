import { create } from "zustand";
import {
  Session,
  User,
  AuthError,
  AuthTokenResponsePassword,
} from "@supabase/supabase-js";
import { supabase } from "@/utils/supabase";

type UserStoreProps = {
  user: User | undefined | null;
  setUser: (user: User) => void;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

export const useUserStore = create<UserStoreProps>()((set) => ({
  user: <User>{},
  setUser: (user: User) => set({ user }),
  signIn: async (email: string, password: string) => {
    const {
      data: { user },
      error,
    }: AuthTokenResponsePassword = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    set({ user });
  },
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    set({ user: null });
  },
}));
