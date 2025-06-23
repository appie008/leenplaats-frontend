import React, { useState } from 'react';

const ProdToevoegen = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [postcode, setPostcode] = useState('');


  const handleSubmit = (e) => {
  e.preventDefault();

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetch('http://leenplaats.test/api/producten', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            description,
            price,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          })
        })
          .then(res => res.json())
          .then(data => {
            console.log('Product toegevoegd:', data);
            setName('');
            setDescription('');
            setPrice('');
          })
          .catch(err => console.error('Fout bij toevoegen product:', err));
      },
      (error) => {
        console.error('Kan locatie niet ophalen:', error);
      }
    );
  } else {
    console.error('Geolocatie wordt niet ondersteund.');
  }
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
        placeholder="Postcode"
        value={postcode}
        onChange={(e) => setPostcode(e.target.value)}
      />

      <button type="submit">Product toevoegen</button>
    </form>
  );
};

export default ProdToevoegen;
