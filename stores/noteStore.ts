import { create } from "zustand";
import { supabase } from "@/utils/supabase";
import { Note } from "@/types/note";

type NoteStoreProps = {
  notes: Note[];
  randomNote: Note | null;
  upsertNote: (note: Note) => Promise<void>;
  fetchNotes: () => Promise<void>;
  fetchNote: (id: string) => Promise<Note>;
};

export const useNoteStore = create<NoteStoreProps>()((set, get) => ({
  notes: <Note[]>[],
  randomNote: <Note>{},
  upsertNote: async (note: Note) => {
    const { tags, id, ...rest } = note;
    const upsertNote: Note = { ...rest };
    if (id) {
      upsertNote["id"] = id;
    }

    let query = supabase.from("notes").upsert([upsertNote]);
    // if (note.id) {
    //   query = query.update(note).eq("id",note.id);
    // } else {
    //   query = query.insert([note]);
    // }
    const { data: noteData, error } = await query.select();
    if (error) throw error;

    const noteId = noteData[0].id;

    if (noteId) {
      const { error: removeTagsError } = await supabase
        .from("tags")
        .delete()
        .eq("note_id", noteId);

      if (tags && tags.length > 0) {
        const noteTags = tags.map(({ name }) => {
          return { note_id: noteId, name };
        });
        const { error: noteTagsError } = await supabase
          .from("tags")
          .insert(noteTags);
      }
    }

    if (Array.isArray(noteData)) {
      // set((state) => ({ notes: [noteData[0], ...state.notes] }));
      get().fetchNotes();
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
    const notesTable = id ? "notes" : "random_notes";
    let query = supabase
      .from(notesTable)
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
      .limit(1);
    if (id) {
      query = query.eq("id", id);
    }
    const { data, error } = await query.single();
    if (data) {
      set({ randomNote: data });
    }
    return data as Note;
  },
}));
