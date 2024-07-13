import { create } from "zustand";
import { supabase } from "@/utils/supabase";
import { Note } from "@/types/note";

type NoteStoreProps = {
  notes: Note[];
  randomNote: Note | null;
  upsertNote: (note: Note) => Promise<void>;
  fetchNotes: () => Promise<void>;
  fetchNote: (id: string) => Promise<void>;
};

export const useNoteStore = create<NoteStoreProps>()((set) => ({
  notes: <Note[]>[],
  randomNote: <Note>{},
  upsertNote: async (note: Note) => {
    const { data: noteData, error } = await supabase
      .from("notes")
      .insert([note])
      .select();
    if (error) throw error;

    const noteId = noteData[0].id;

    if (note.tags?.length > 0) {
      const noteTags = note.tags.map((name) => ({ note_id: noteId, name }));
      const { error: noteTagsError } = await supabase
        .from("tags")
        .insert(noteTags);
    }

    if (Array.isArray(noteData)) {
      set((state) => ({ notes: [noteData[0], ...state.notes] }));
    }
  },
  fetchNotes: async () => {
    const tag = "cms";
    let { data: notes, error } = await supabase
      .from("notes")
      .select(
        `
        id,
        name,
        description,
        user_id,
        tags (
          note_id, name,id
        )
      `,
      )
      // .filter('tags', 'cs', `"${tag}"`)
      .order("update_at", { ascending: false });
    if (error) throw error;
    if (Array.isArray(notes)) {
      set({ notes });
    }
  },

  fetchNote: async (id: string) => {
    const { data, error } = await supabase
      .from("random_notes")
      .select("*")
      .limit(1)
      .single();
    if (data) {
      set({ randomNote: data });
    }
  },
}));
