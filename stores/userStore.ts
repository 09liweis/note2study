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
  session: Session | null;
  setUser: (user: User) => void;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  getUserSession: () => Promise<void>;
};

type SessionProps = {
  data:
    | {
        session: Session;
      }
    | {
        session: null;
      }
    | {
        session: null;
      };
  error: AuthError | null;
};

export const useUserStore = create<UserStoreProps>()((set) => ({
  user: <User>{},
  session: <Session>{},
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
    set({ user: null, session: null });
  },

  getUserSession: async () => {
    const {
      data: { session },
      error,
    }: SessionProps = await supabase.auth.getSession();
    if (session) {
      set({ session });
    }
  },
}));
