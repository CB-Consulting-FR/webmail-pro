export type Priority = "Urgent" | "Important" | "Planifier" | "Info" | "Trash";

export interface Sender {
  name: string;
  email: string;
  initials: string;
}

export interface Email {
  id: string;
  sender: Sender;
  subject: string;
  body: string;
  date: string;
  priority?: Priority; // ici on attend un type strict
}
