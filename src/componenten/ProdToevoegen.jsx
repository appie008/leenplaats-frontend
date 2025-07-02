import React, { useState } from 'react';

const ProdToevoegen = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    fetch('/api/producten', {
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
        alert('Product succesvol toegevoegd!');
        resetForm();
      })
      .catch(err => {
        console.error('Fout bij toevoegen product:', err);
        alert('Er is iets misgegaan bij het toevoegen van het product');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setPrice('');
    setLatitude('');
    setLongitude('');
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude.toString());
          setLongitude(position.coords.longitude.toString());
        },
        (error) => {
          alert('Kon locatie niet ophalen: ' + error.message);
        }
      );
    } else {
      alert('Geolocatie wordt niet ondersteund door deze browser');
    }
  };

  return (
    <div className="products-container">
      <div className="container" style={{maxWidth: '42rem'}}>
        <div className="page-header">
          <h1 className="page-title">Product Toevoegen</h1>
          <p className="page-description">Voeg een nieuw product toe aan de Leenplaats</p>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Productnaam *
              </label>
              <input
                id="name"
                type="text"
                placeholder="Bijv. Boormachine, Fiets, Ladder..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-field"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description" className="form-label">
                Beschrijving
              </label>
              <textarea
                id="description"
                rows={4}
                placeholder="Beschrijf je product..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="textarea-field"
              />
            </div>

            <div className="form-group">
              <label htmlFor="price" className="form-label">
                Prijs per dag (€) *
              </label>
              <input
                id="price"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="input-field"
                required
              />
            </div>

            <div className="grid-2">
              <div className="form-group">
                <label htmlFor="latitude" className="form-label">
                  Latitude *
                </label>
                <input
                  id="latitude"
                  type="text"
                  placeholder="52.3702"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  className="input-field"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="longitude" className="form-label">
                  Longitude *
                </label>
                <input
                  id="longitude"
                  type="text"
                  placeholder="4.8952"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  className="input-field"
                  required
                />
              </div>
            </div>

            <button
              type="button"
              onClick={getCurrentLocation}
              className="btn-secondary"
              style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}
            >
              <svg style={{width: '1.25rem', height: '1.25rem', marginRight: '0.5rem'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Gebruik mijn huidige locatie
            </button>

            <button
              type="submit"
              disabled={loading}
              className={`btn-primary ${loading ? 'btn-loading' : ''}`}
              style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}
            >
              {loading ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg style={{width: '1.25rem', height: '1.25rem', marginRight: '0.5rem'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              )}
              {loading ? 'Product toevoegen...' : 'Product Toevoegen'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProdToevoegen;