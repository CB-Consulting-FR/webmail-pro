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

  const resetPriorities = () => {
    setEmailsState(generateEmailsWithDates());
    setSelectedEmail(null);
    setShowDebrief(false);
    setFilter('');
  };

  const handleDebrief = () => {
    setShowDebrief(true);
  };

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

  const filteredEmails = filter ? emailsState.filter(e => e.priority === filter) : emailsState;

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
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>📨 WebMail Pro</h1>
      <div style={{ marginBottom: 20 }}>
        <button onClick={resetPriorities}>♻️ Réinitialiser</button>
        <button onClick={handleDebrief} style={{ marginLeft: 10 }}>📊 Débrief</button>
        <button onClick={exportDebriefToCSV} style={{ marginLeft: 10 }}>📄 Export CSV</button>
      </div>

      {showDebrief && (
        <div>
          <h3>📊 Débrief des mails classés</h3>
          {['Urgent', 'Important', 'Planifier', 'Info', 'Trash', 'NonClassé'].map(priority => {
            const list = emailsState.filter(mail => priority === 'NonClassé' ? !mail.priority : mail.priority === priority);
            return (
              <div key={priority}>
                <strong>{priority} : {list.length} mail(s)</strong>
                <ul>
                  {list.map(mail => (
                    <li key={mail.id}>{mail.subject} — {mail.sender.name}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      )}

      <hr />
      <h2>📥 Boîte de réception</h2>

      <div style={{ display: 'flex', gap: 20 }}>
        {/* 📩 Liste des mails */}
        <div style={{ flex: 1 }}>
          {filteredEmails.map(email => (
            <div
              key={email.id}
              style={{
                marginBottom: 15,
                border: '1px solid #ccc',
                padding: 10,
                borderRadius: 4,
                cursor: 'pointer',
                backgroundColor: selectedEmail?.id === email.id ? '#f5f5f5' : 'white'
              }}
              onClick={() => setSelectedEmail(email)}
            >
              <strong>{email.sender.name}</strong> - {email.subject}<br />
              <small>{new Date(email.date).toLocaleString('fr-FR')}</small><br />
              <span style={{ ...getPriorityStyle(email.priority), padding: '2px 8px', borderRadius: 12 }}>
                {email.priority || 'Non classé'}
              </span>
              <div style={{ marginTop: 10 }}>
                {['Urgent', 'Important', 'Planifier', 'Info', 'Trash'].map(p => (
                  <button
                    key={p}
                    onClick={(e) => {
                      e.stopPropagation();
                      setEmailsState((prev) =>
                        prev.map((mail) =>
                          mail.id === email.id ? { ...mail, priority: p as Email['priority'] } : mail
                        )
                      );
                    }}
                    style={{
                      marginRight: 5,
                      padding: '4px 10px',
                      fontSize: '0.8em',
                      backgroundColor: getPriorityStyle(p).backgroundColor,
                      color: 'white',
                      border: 'none',
                      borderRadius: 6,
                      cursor: 'pointer'
                    }}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 📄 Détail du mail sélectionné */}
        {selectedEmail && (
          <div style={{ flex: 1, padding: 15, border: '1px solid #999', borderRadius: 6, backgroundColor: '#fafafa' }}>
            <h3>Détail du mail</h3>
            <p><strong>Expéditeur :</strong> {selectedEmail.sender.name} ({selectedEmail.sender.email})</p>
            <p><strong>Sujet :</strong> {selectedEmail.subject}</p>
            <p><strong>Date :</strong> {new Date(selectedEmail.date).toLocaleString('fr-FR')}</p>
            <p><strong>Contenu :</strong></p>
            <p>{selectedEmail.body}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
