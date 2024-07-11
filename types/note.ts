export type Note = {
  id?: string;
  name: string;
  description: string;
  tags?: string[];
  user_id: string | undefined;
};

export type NoteCardProps = {
  note: Note;
};
