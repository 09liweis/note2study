import { create } from "zustand";
import { supabase } from "@/utils/supabase";
import { Note } from "@/types/note";

type NoteStoreProps = {
  notes: Note[];
  upsertNote: (note: Note) => Promise<void>;
  fetchNotes: () => Promise<void>;
};

export const useNoteStore = create<NoteStoreProps>()((set) => ({
  notes: <Note[]>[],
  upsertNote: async (note: Note) => {
    const { data, error } = await supabase
      .from("notes")
      .insert([note])
      .select();
    if (error) throw error;
    if (Array.isArray(data)) {
      set((state) => ({ notes: [data[0], ...state.notes] }));
    }
  },
  fetchNotes: async () => {
    let { data: notes, error } = await supabase
      .from("notes")
      .select("id,name,description,tags,user_id")
      .order("update_at", { ascending: false });
    if (error) throw error;
    if (Array.isArray(notes)) {
      set({ notes });
    }
  },
}));
