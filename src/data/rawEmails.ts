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
  },
  {
    id: "3",
    sender: { name: "Claire Dubois", email: "claire@mail.com", initials: "CD" },
    subject: "Réunion équipe demain",
    body: "Pensez à préparer vos slides pour demain 9h."
  },
  {
    id: "4",
    sender: { name: "Marc Petit", email: "marc@mail.com", initials: "MP" },
    subject: "Nouveau process RH",
    body: "Voici le document avec le nouveau processus RH à lire attentivement."
  },
  {
    id: "5",
    sender: { name: "Inès Morel", email: "ines@mail.com", initials: "IM" },
    subject: "Offre spéciale clients",
    body: "À transmettre à vos clients VIP avant la fin du mois."
  },
  {
    id: "6",
    sender: { name: "Thomas Noël", email: "thomas@mail.com", initials: "TN" },
    subject: "Rapport mensuel à valider",
    body: "Le rapport est prêt, merci de le valider d’ici vendredi."
  },
  {
    id: "7",
    sender: { name: "Julie Bernard", email: "julie@mail.com", initials: "JB" },
    subject: "Réclamation client URGENTE",
    body: "Merci de prendre en charge la plainte du client DUPONT immédiatement."
  },
  {
    id: "8",
    sender: { name: "Paul Richard", email: "paul@mail.com", initials: "PR" },
    subject: "Déjeuner d'équipe",
    body: "On se fait un resto vendredi midi ? Répondez tous !"
  },
  {
    id: "9",
    sender: { name: "Sophie Leroy", email: "sophie@mail.com", initials: "SL" },
    subject: "Accès VPN",
    body: "Un souci technique empêche l’accès VPN, l’équipe IT est dessus."
  },
  {
    id: "10",
    sender: { name: "Alex Martin", email: "alex@mail.com", initials: "AM" },
    subject: "Invitation formation produit",
    body: "Formation obligatoire prévue mardi à 14h pour tous les commerciaux."
  }
];

export function generateEmailsWithDates(): Email[] {
  return rawEmails.map(email => ({
    ...email,
    date: new Date().toISOString() // génère une date actuelle à chaque reload
  }));
}
