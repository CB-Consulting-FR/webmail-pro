// rawEmails.ts
import { Email } from './emails';

const rawEmails: Omit<Email, 'date'>[] = [
  {
    id: "1",
    sender: { name: "Emma Martin", email: "emma@mail.com", initials: "EM" },
    subject: "Pause café ?",
    body: "Un petit café cet après-midi ?"
  },
  {
    id: "2",
    sender: { name: "David Lefevre", email: "david@mail.com", initials: "DL" },
    subject: "Projet en cours",
    body: "Le projet avance bien, voici les dernières infos..."
  }
  // Ajoute d'autres mails ici
];

export function generateEmailsWithDates(): Email[] {
  return rawEmails.map(email => ({
    ...email,
    date: new Date().toISOString() // génère automatiquement la date du jour
  }));
}
