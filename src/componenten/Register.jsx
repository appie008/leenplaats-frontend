import React, { useState } from 'react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);

    fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    })
      .then(res => res.json())
      .then(data => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          alert('Registratie gelukt, je bent nu ingelogd!');
          window.location.href = '/producten';
        } else {
          alert('Registratie mislukt: ' + (data.message || 'Controleer je gegevens'));
        }
      })
      .catch(err => {
        console.error('Fout bij registreren:', err);
        alert('Er is iets misgegaan bij het registreren');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>Maak een nieuw account</h2>
        <p>
          Al een account?{' '}
          <a href="/login">Log hier in</a>
        </p>
      </div>

      <div className="form-wrapper">
        <div className="card">
          <form onSubmit={handleRegister} className="form">
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Volledige naam
              </label>
              <input
                id="name"
                type="text"
                placeholder="Je volledige naam"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-field"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                E-mailadres
              </label>
              <input
                id="email"
                type="email"
                placeholder="je@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Wachtwoord
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`btn-primary ${loading ? 'btn-loading' : ''}`}
            >
              {loading && (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              {loading ? 'Bezig met registreren...' : 'Account aanmaken'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;