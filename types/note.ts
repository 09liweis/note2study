export type Note = {
  id: string;
  title: string;
  detail: string;
  tags: string[];
};

export type NoteCardProps = {
  note: Note;
};
