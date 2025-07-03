import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    fetch('http://leenplaats.test/api/login', { // Pas dit aan naar jouw backend URL als nodig
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
      .then(res => res.json())
      .then(data => {
        if (data.access_token) {
          localStorage.setItem('token', data.access_token);
          alert('Je bent succesvol ingelogd!');
          window.location.href = '/producten';
        } else {
          alert('Login mislukt: ' + (data.message || 'Controleer je gegevens'));
        }
      })
      .catch(err => {
        console.error('Fout bij inloggen:', err);
        alert('Er is iets misgegaan bij het inloggen');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>Inloggen op je account</h2>
        <p>
          Nog geen account?{' '}
          <a href="/register">Registreer hier</a>
        </p>
      </div>

      <div className="form-wrapper">
        <div className="card">
          <form onSubmit={handleLogin} className="form">
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
              {loading ? 'Bezig met inloggen...' : 'Inloggen'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
