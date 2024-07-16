export type Tag = {
  id?: number;
  note_id?: string;
  name: string;
};

export type Note = {
  id?: string;
  name: string;
  description: string;
  tags?: Tag[];
  user_id: string | undefined;
};

export type NoteCardProps = {
  note: Note;
};

export type NoteTagsProps = {
  tags: Tag[];
};
