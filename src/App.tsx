      import React, { useState } from 'react';
      import { emails, Email } from './data/emails';
      import { saveAs } from 'file-saver';

      function App() {
        const [isAuthenticated, setIsAuthenticated] = useState(false);
        const [accessCode, setAccessCode] = useState('');
        const [showIntro, setShowIntro] = useState(true);
        const [showAddForm, setShowAddForm] = useState(false);
        const [newMail, setNewMail] = useState({ senderName: '', subject: '', body: '' });
        const [emailsState, setEmailsState] = useState<Email[]>(emails);
        const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
        const [filter, setFilter] = useState<string>('');
        const [showDebrief, setShowDebrief] = useState(false);
        const allMailsClassified = emailsState.every((email) => !!email.priority);
        const reset = emails.map(email => ({ ...email, priority: undefined }));
        setEmailsState(reset);
        const resetPriorities = () => {
          setEmailsState(emails);
          setSelectedEmail(null);
          setShowDebrief(false);
          setFilter('');
        };

        const handleDebrief = () => {
          setShowDebrief(true);
        };

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
              <img
                src="/logo.png"
                alt="Logo WebMail Pro"
                style={{ height: 80, marginBottom: 20 }}
              />
              <h1>🔐 Accès à WebMail Pro</h1>
              <p>Veuillez entrer le code fourni pour accéder à l’exercice :</p>

              <input
                type="password"
                placeholder="Code d’accès"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                style={{
                  padding: '10px',
                  fontSize: '1em',
                  marginTop: 10,
                  border: '1px solid #ccc',
                  borderRadius: 4,
                  width: '250px'
                }}
              />
              <br />
              <button
                style={{
                  marginTop: 20,
                  padding: '10px 20px',
                  fontSize: '1em',
                  backgroundColor: '#1976d2',
                  color: 'white',
                  border: 'none',
                  borderRadius: 6,
                  cursor: 'pointer'
                }}
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
              <img
                src="/logo.png"
                alt="Logo WebMail Pro"
                style={{ height: 80, marginBottom: 20 }}
              />
              <h1>📬 Bienvenue sur WebMail Pro</h1>
              <p style={{ fontSize: '1.2em', maxWidth: 600, margin: 'auto' }}>
                Cet exercice vous permet de classer vos mails selon leur priorité :
                Urgent, Important, À planifier, Pour information ou à jeter.
              </p>
              <p>Analysez les mails, attribuez une priorité, puis lancez le débrief final !</p>
              <button
                onClick={() => setShowIntro(false)}
                style={{
                  marginTop: 30,
                  padding: '12px 24px',
                  fontSize: '1.1em',
                  backgroundColor: '#1976d2',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                🚀 Démarrer l’exercice
              </button>
            </div>
          );
        }
        return (
          
          <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'sans-serif' }}>
            

            {/* Barre supérieure de filtre */}
            <div style={{ background: '#e0e0e0', padding: '10px 20px', display: 'flex', gap: 10 }}>
              <span>🧮 Trier par :</span>
              <button onClick={() => setFilter('Urgent')}>🔥 Urgent</button>
              <button onClick={() => setFilter('Important')}>⭐ Important</button>
              <button onClick={() => setFilter('Planifier')}>📅 Planifier</button>
              <button onClick={() => setFilter('Info')}>ℹ️ Pour information</button>
              <button onClick={() => setFilter('Trash')}>🗑️ Poubelle</button>
              <button onClick={() => setFilter('')}>🔄 Tous</button>
              <div style={{ marginLeft: 'auto' }}>
                <button
                  onClick={handleDebrief}
                  style={{ backgroundColor: '#1976d2', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}
                >📊 Débrief final</button>
              </div>
            </div>

            {showDebrief && (
              <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderTop: '1px solid #ccc' }}>
                <h3>📊 Débrief des priorités</h3>
                {['Urgent', 'Important', 'Planifier', 'Info', 'Trash', 'NonClassé'].map(priority => {
                  const list = emailsState.filter(mail => priority === 'NonClassé' ? !mail.priority : mail.priority === priority);
                  return (
                    <div key={priority} style={{ marginBottom: 15 }}>
                      <strong>{priority} : {list.length} mail(s)</strong>
                      <ul style={{ marginTop: 5 }}>
                        {list.map(mail => (
                          <li key={mail.id}>{mail.subject} — {mail.sender.name}</li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            )}

            <div style={{ position: 'fixed', bottom: 0, right: 0, margin: '20px', zIndex: 999 }}>
              <button
                onClick={resetPriorities}
                style={{ backgroundColor: '#f44336', color: 'white', border: 'none', padding: '10px 18px', borderRadius: '30px', fontWeight: 'bold', boxShadow: '0 4px 8px rgba(0,0,0,0.2)', cursor: 'pointer' }}
              >♻️ Réinitialiser les classements</button>
            </div>
            <div style={{ textAlign: 'right', marginTop: '20px' }}>
              <button
                onClick={exportDebriefToCSV}
                style={{
                  backgroundColor: '#4caf50',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: 4,
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                📄 Exporter le débrief (.CSV)
              </button>
            </div>
            {allMailsClassified && (
              <div
                style={{
                  marginTop: 40,
                  padding: '25px',
                  backgroundColor: '#e8f5e9',
                  border: '2px solid #4caf50',
                  borderRadius: '12px',
                  textAlign: 'center',
                  fontSize: '1.3em',
                  color: '#2e7d32',
                  fontWeight: 'bold',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  maxWidth: '700px',
                  marginLeft: 'auto',
                  marginRight: 'auto'
                }}
              >
                🎉 Bravo ! Vous avez terminé le classement de tous les mails.
                <br />
                La gestion des priorités, c’est la clé d’un quotidien plus serein 💡
              </div>
            )}
            {/* Contenu principal */}
            <div style={{ flex: 1, display: 'flex' }}>

              {/* Colonne 1 */}
              <aside style={{ width: '220px', backgroundColor: '#f4f4f4', padding: '15px' }}>
                <h2>Dossiers</h2>
                <ul>
                  <li>📥 Boîte de réception</li>
                  <li>📤 Envoyés</li>
                  <li>📝 Brouillons</li>
                  <li>🗑️ Corbeille</li>
                </ul>
              </aside>

              {/* Colonne 2 */}
              <section style={{ width: '300px', borderLeft: '1px solid #ccc', borderRight: '1px solid #ccc', padding: '15px', overflowY: 'auto' }}>
                <h3>Mails</h3>
                <button
                  onClick={() => setShowAddForm(!showAddForm)}
                  style={{ marginBottom: 10, padding: '6px 12px', backgroundColor: '#4caf50', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' }}
                >{showAddForm ? 'Annuler' : '➕ Nouveau mail'}</button>

                {showAddForm && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const newEmail = {
                        id: Date.now().toString(),
                        sender: {
                          name: newMail.senderName,
                          email: 'demo@mail.com',
                          initials: newMail.senderName.split(' ').map(n => n[0]).join('').toUpperCase()
                        },
                        subject: newMail.subject,
                        body: newMail.body,
                        date: new Date().toISOString(),
                        priority: undefined
                      };
                      setEmailsState([newEmail, ...emailsState]);
                      setNewMail({ senderName: '', subject: '', body: '' });
                      setShowAddForm(false);
                    }}
                    style={{ marginBottom: 20 }}
                  >
                    <input type="text" placeholder="Nom de l'expéditeur" value={newMail.senderName} onChange={(e) => setNewMail({ ...newMail, senderName: e.target.value })} required style={{ display: 'block', marginBottom: 5, width: '100%' }} />
                    <input type="text" placeholder="Sujet" value={newMail.subject} onChange={(e) => setNewMail({ ...newMail, subject: e.target.value })} required style={{ display: 'block', marginBottom: 5, width: '100%' }} />
                    <textarea placeholder="Contenu du mail" value={newMail.body} onChange={(e) => setNewMail({ ...newMail, body: e.target.value })} required rows={3} style={{ display: 'block', marginBottom: 5, width: '100%' }} />
                    <button type="submit" style={{ backgroundColor: '#2196f3', color: 'white', border: 'none', padding: '6px 12px', borderRadius: 4, cursor: 'pointer' }}>Ajouter</button>
                  </form>
                )}

                {filteredEmails.length === 0 ? (
                  <p style={{ color: 'gray', fontStyle: 'italic' }}>Aucun mail pour cette priorité.</p>
                ) : (
                  filteredEmails.map(email => (
                    <div
                      key={email.id}
                      style={{ marginBottom: 15, padding: 10, background: '#fff', border: '1px solid #ddd', cursor: 'pointer' }}
                      onClick={() => setSelectedEmail(email)}
                    >
                      <strong>{email.sender.name}</strong><br />
                      <span>{email.subject}</span><br />
                      <small style={{ color: 'gray' }}>
                        {new Date(email.date).toLocaleDateString('fr-FR')} à {new Date(email.date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                      </small><br />
                      {email.priority && (
                        <span
                          style={{ display: 'inline-block', marginTop: 5, padding: '2px 8px', borderRadius: '12px', fontSize: '0.75em', fontWeight: 'bold', ...getPriorityStyle(email.priority) }}
                        >{email.priority}</span>
                      )}
                    </div>
                  ))
                )}
              </section>

              {/* Colonne 3 */}
              <section style={{ flex: 1, padding: '15px' }}>
                {selectedEmail ? (
                  <>
                    <h2>{selectedEmail.subject}</h2>
                    <p><strong>De :</strong> {selectedEmail.sender.name} &lt;{selectedEmail.sender.email}&gt;</p>
                    <p><strong>Date :</strong> {selectedEmail.date}</p>
                    <p style={{ marginTop: 20 }}>{selectedEmail.body}</p>
                    <div style={{ marginTop: 30 }}>
                      <label style={{ fontSize: '0.9em' }}>
                        🏷️ Classer ce mail :
                        <select
                          value={selectedEmail.priority ?? ''}
                          onChange={(e) => {
                            const newPriority = e.target.value as Email['priority'];
                            const updated = [...emailsState];
                            const index = updated.findIndex(m => m.id === selectedEmail.id);
                            if (index !== -1) {
                              updated[index] = { ...updated[index], priority: newPriority };
                              setEmailsState(updated);
                              setSelectedEmail(updated[index]);
                            }
                          }}
                        >
                          <option value="">-- Choisir --</option>
                          <option value="Urgent">🔥 Urgent</option>
                          <option value="Important">⭐ Important</option>
                          <option value="Planifier">📅 Planifier</option>
                          <option value="Info">ℹ️ Pour information</option>
                          <option value="Trash">🗑️ Poubelle</option>
                        </select>
                      </label>
                    </div>
                  </>
                ) : (
                  <p>Sélectionne un mail pour voir son contenu</p>
                )}
              </section>
            </div>
          </div>
        );
      }

      export default App;
