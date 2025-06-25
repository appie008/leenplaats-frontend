import React, { useState } from 'react';

const ProdToevoegen = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://leenplaats.test/api/producten', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        description,
        price,
        latitude,
        longitude
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log('Product toegevoegd:', data);
        resetForm();
      })
      .catch(err => console.error('Fout bij toevoegen product:', err));
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setPrice('');
    setLatitude('');
    setLongitude('');
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <input
        type="text"
        placeholder="Productnaam"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <textarea
        placeholder="Beschrijving"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="number"
        placeholder="Prijs (€)"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Latitude (bijv. 52.3702)"
        value={latitude}
        onChange={(e) => setLatitude(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Longitude (bijv. 4.8952)"
        value={longitude}
        onChange={(e) => setLongitude(e.target.value)}
        required
      />
      <button type="submit">Product toevoegen</button>
    </form>
  );
};

export default ProdToevoegen;
