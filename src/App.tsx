// App.tsx
import React, { useState } from 'react';
import { generateEmailsWithDates } from './data/rawEmails';
import { Email } from './data/emails';
import { saveAs } from 'file-saver';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [showIntro, setShowIntro] = useState(true);
  const [emailsState, setEmailsState] = useState<Email[]>(generateEmailsWithDates());
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [filter, setFilter] = useState<string>('');
  const [showDebrief, setShowDebrief] = useState(false);

  const allMailsClassified = emailsState.every((email) => !!email.priority);

  const resetPriorities = () => {
    setEmailsState(generateEmailsWithDates());
    setSelectedEmail(null);
    setShowDebrief(false);
    setFilter('');
  };

  const handleDebrief = () => setShowDebrief(true);

  const getPriorityStyle = (priority?: string) => {
    switch (priority) {
      case 'Urgent': return { backgroundColor: '#e53935', color: 'white' };
      case 'Important': return { backgroundColor: '#ff9800', color: 'white' };
      case 'Planifier': return { backgroundColor: '#1976d2', color: 'white' };
      case 'Info': return { backgroundColor: '#9e9e9e', color: 'white' };
      case 'Trash': return { backgroundColor: '#607d8b', color: 'white' };
      default: return { backgroundColor: '#e0e0e0', color: '#333' };
    }
  };

  const filteredEmails = filter ? emailsState.filter(e => e.priority === filter) : emailsState;

  const exportDebriefToCSV = () => {
    const categories = ['Urgent', 'Important', 'Planifier', 'Info', 'Trash', 'NonClassé'];
    const rows = [["Priorité", "Nom de l'expéditeur", "Sujet", "Date"]];

    categories.forEach((priority) => {
      const mails = emailsState.filter((mail) =>
        priority === "NonClassé" ? !mail.priority : mail.priority === priority
      );

      mails.forEach((mail) => {
        rows.push([
          priority,
          mail.sender.name,
          mail.subject,
          new Date(mail.date).toLocaleString('fr-FR')
        ]);
      });
    });

    const csvContent = rows.map(r => r.map(v => `"${v}"`).join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "debrief-mails.csv");
  };

  if (!isAuthenticated) {
    return (
      <div style={{ padding: '50px', textAlign: 'center', fontFamily: 'sans-serif' }}>
        <img src="/logo.png" alt="Logo WebMail Pro" style={{ height: 80, marginBottom: 20 }} />
        <h1>🔐 Accès à WebMail Pro</h1>
        <p>Veuillez entrer le code fourni pour accéder à l’exercice :</p>
        <input
          type="password"
          placeholder="Code d’accès"
          value={accessCode}
          onChange={(e) => setAccessCode(e.target.value)}
          style={{ padding: '10px', fontSize: '1em', marginTop: 10, border: '1px solid #ccc', borderRadius: 4, width: '250px' }}
        />
        <br />
        <button
          style={{ marginTop: 20, padding: '10px 20px', fontSize: '1em', backgroundColor: '#1976d2', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer' }}
          onClick={() => {
            if (accessCode === 'cedric2025') {
              setIsAuthenticated(true);
            } else {
              alert('❌ Code incorrect. Veuillez réessayer.');
            }
          }}
        >
          ✅ Valider
        </button>
      </div>
    );
  }

  if (showIntro) {
    return (
      <div style={{ padding: '50px', textAlign: 'center', fontFamily: 'sans-serif' }}>
        <img src="/logo.png" alt="Logo WebMail Pro" style={{ height: 80, marginBottom: 20 }} />
        <h1>📬 Bienvenue sur WebMail Pro</h1>
        <p style={{ fontSize: '1.2em', maxWidth: 600, margin: 'auto' }}>
          Cet exercice vous permet de classer vos mails selon leur priorité : Urgent, Important, À planifier, Pour information ou à jeter.
        </p>
        <p>Analysez les mails, attribuez une priorité, puis lancez le débrief final !</p>
        <button
          onClick={() => setShowIntro(false)}
          style={{ marginTop: 30, padding: '12px 24px', fontSize: '1.1em', backgroundColor: '#1976d2', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
        >
          🚀 Démarrer l’exercice
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'sans-serif' }}>
      {/* Sidebar Gauche */}
      <div style={{ width: '220px', borderRight: '1px solid #ccc', padding: '20px' }}>
        <h3>Filtres</h3>
        {['', 'Urgent', 'Important', 'Planifier', 'Info', 'Trash'].map(p => (
          <div key={p}>
            <button
              onClick={() => setFilter(p)}
              style={{ marginBottom: 8, width: '100%', backgroundColor: filter === p ? '#1976d2' : '#f0f0f0', color: filter === p ? 'white' : '#000', border: 'none', padding: 8, borderRadius: 4 }}
            >
              {p || 'Tous'}
            </button>
          </div>
        ))}
        <hr />
        <button onClick={resetPriorities} style={{ width: '100%' }}>♻️ Réinitialiser</button>
        <button onClick={handleDebrief} style={{ marginTop: 10, width: '100%' }}>📊 Débrief</button>
        <button onClick={exportDebriefToCSV} style={{ marginTop: 10, width: '100%' }}>📄 Export CSV</button>
      </div>

      {/* Liste des mails */}
      <div style={{ flex: 1, overflowY: 'auto', padding: 20 }}>
        <h2>📥 Boîte de réception</h2>
        {filteredEmails.map(email => (
          <div
            key={email.id}
            onClick={() => setSelectedEmail(email)}
            style={{
              marginBottom: 15,
              padding: 10,
              borderRadius: 6,
              backgroundColor: selectedEmail?.id === email.id ? '#e3f2fd' : '#f9f9f9',
              border: '1px solid #ccc',
              cursor: 'pointer'
            }}
          >
            <strong>{email.sender.name}</strong> - {email.subject}<br />
            <small>{new Date(email.date).toLocaleString('fr-FR')}</small><br />
            <span style={{ ...getPriorityStyle(email.priority), padding: '2px 8px', borderRadius: 12 }}>{email.priority || 'Non classé'}</span>
          </div>
        ))}
      </div>

      {/* Affichage du mail sélectionné */}
      <div style={{ width: '33%', borderLeft: '1px solid #ccc', padding: 20 }}>
        {selectedEmail ? (
          <>
            <h2>{selectedEmail.subject}</h2>
            <p><strong>De :</strong> {selectedEmail.sender.name} ({selectedEmail.sender.email})</p>
            <p><strong>Date :</strong> {new Date(selectedEmail.date).toLocaleString('fr-FR')}</p>
            <hr />
            <p>{selectedEmail.body}</p>
            <hr />
            <h4>Attribuer une priorité :</h4>
            {['Urgent', 'Important', 'Planifier', 'Info', 'Trash'].map(p => (
              <button
                key={p}
                onClick={() => {
                  setEmailsState(prev =>
                    prev.map(e =>
                      e.id === selectedEmail.id ? { ...e, priority: p } : e
                    )
                  );
                  setSelectedEmail(null);
                }}
                style={{ marginRight: 8 }}
              >
                {p}
              </button>
            ))}
          </>
        ) : (
          <p s>📬 Cliquez sur un mail pour le consulter</p>
        )}
      </div>
    </div>
  );
}

export default App;
