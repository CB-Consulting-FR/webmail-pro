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
  priority?: "Urgent" | "Important" | "Info" | "Trash"; // optionnel maintenant
}

export const emails: Email[] = [
  {
    id: "1",
    sender: {
      name: "Emma Martin",
      email: "emma@mail.com",
      initials: "EM"
    },
    subject: "Pause café ?",
    body: "Un petit café cet après-midi ?",
    date: "2025-03-16 17:03"
  },
  {
    id: "2",
    sender: {
      name: "David Lefevre",
      email: "david@mail.com",
      initials: "DL"
    },
    subject: "Projet en cours",
    body: "Le projet avance bien, voici les dernières infos...",
    date: "2025-03-15 10:22"
  }
];
