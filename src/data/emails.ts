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
  priority?: "Urgent" | "Important" | "Planifier" | "Info" | "Trash";
}

export const emails: Email[] = [
  {
    id: "1",
    sender: { name: "Emma Martin", email: "emma@mail.com", initials: "EM" },
    subject: "Pause café ?",
    body: "Un petit café cet après-midi ?",
    date: "2025-04-08T15:23:00"
  },
  {
    id: "2",
    sender: { name: "David Lefevre", email: "david@mail.com", initials: "DL" },
    subject: "Projet en cours",
    body: "Le projet avance bien, voici les dernières infos...",
    date: "2025-04-08T09:14:00"
  },
  {
    id: "3",
    sender: { name: "Support IT", email: "support@intra.com", initials: "SI" },
    subject: "Maintenance prévue jeudi",
    body: "Le système sera indisponible jeudi matin pour mise à jour.",
    date: "2025-04-07T17:30:00"
  },
  {
    id: "4",
    sender: { name: "Julie Bernard", email: "julie@marketing.com", initials: "JB" },
    subject: "Réunion stratégie marketing demain",
    body: "Peux-tu préparer quelques slides pour demain ?",
    date: "2025-04-07T11:45:00"
  },
  {
    id: "5",
    sender: { name: "Paul Dubois", email: "paul@finance.com", initials: "PD" },
    subject: "Facture en attente de validation",
    body: "Merci de valider la facture pour clôturer le mois.",
    date: "2025-04-06T16:00:00"
  },
  {
    id: "6",
    sender: { name: "Camille Roussel", email: "camille@rh.com", initials: "CR" },
    subject: "Rappel : entretien individuel à planifier",
    body: "Merci de m’envoyer tes dispos pour ton entretien annuel.",
    date: "2025-04-05T08:50:00"
  },
  {
    id: "7",
    sender: { name: "Service Communication", email: "com@intra.com", initials: "SC" },
    subject: "Newsletter du mois d’avril",
    body: "Découvrez les projets et actus du mois.",
    date: "2025-04-04T14:20:00"
  },
  {
    id: "8",
    sender: { name: "Léa Garnier", email: "lea@agence.com", initials: "LG" },
    subject: "Nouveau brief client à traiter",
    body: "Le client X a envoyé un nouveau brief, à traiter rapidement.",
    date: "2025-04-04T10:00:00"
  },
  {
    id: "9",
    sender: { name: "Raphaël Moreau", email: "raphael@events.com", initials: "RM" },
    subject: "Organisation événement du 28 avril",
    body: "Besoin de ton retour sur la logistique et les intervenants.",
    date: "2025-04-03T13:15:00"
  },
  {
    id: "10",
    sender: { name: "Nina Roy", email: "nina@cabinet.com", initials: "NR" },
    subject: "Annulation de rendez-vous",
    body: "Je dois annuler notre point de demain, je te repropose une date.",
    date: "2025-04-02T09:30:00"
  }
];
