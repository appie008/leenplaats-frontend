import React, { useState } from 'react';

const ProductForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://leenplaats.test/api/producten', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description, price })
    })
      .then(res => res.json())
      .then(data => {
        console.log('Product toegevoegd:', data);
        setName('');
        setDescription('');
        setPrice('');
      })
      .catch(err => console.error('Fout bij toevoegen product:', err));
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
      <button type="submit">Product toevoegen</button>
    </form>
  );
};

export default ProductForm;
