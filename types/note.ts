export type Note = {
  id: string;
  name: string;
  description: string;
  tags: string[];
};

export type NoteCardProps = {
  note: Note;
};
