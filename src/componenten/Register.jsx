import React, { useState } from 'react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();

    fetch('http://leenplaats.test/api/register', {
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
      });
  };

  return (
    <div>
      <h2>Registreren</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Naam"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
        <button type="submit">Registreren</button>
      </form>
    </div>
  );
};

export default Register;
