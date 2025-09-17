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
  priority?: "Urgent" | "Important" | "Planifier" | "Info" | "Trash"; // optionnel
}
