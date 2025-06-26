import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    fetch('http://leenplaats.test/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
      .then(res => res.json())
      .then(data => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          alert('Je bent succesvol ingelogd!');
          window.location.href = '/producten'; // eventueel redirect
        } else {
          alert('Login mislukt: ' + (data.message || 'Controleer je gegevens'));
        }
      })
      .catch(err => {
        console.error('Fout bij inloggen:', err);
        alert('Er is iets misgegaan bij het inloggen');
      });
  };

  return (
    <div>
      <h2>Inloggen</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Wachtwoord"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Inloggen</button>
      </form>
    </div>
  );
};

export default Login;
