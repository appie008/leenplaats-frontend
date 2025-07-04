import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Producten = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [userLatitude, setUserLatitude] = useState(null);
  const [userLongitude, setUserLongitude] = useState(null);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [sortOption, setSortOption] = useState('');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLatitude(position.coords.latitude);
          setUserLongitude(position.coords.longitude);
          fetchProducts();
        },
        () => fetchProducts()
      );
    } else {
      fetchProducts();
    }
  }, []);

  const fetchProducts = () => {
    fetch('http://leenplaats.test/api/producten')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Fout bij ophalen producten:', err);
        setLoading(false);
      });
  };

  const reserveerProduct = (productId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Je moet eerst inloggen om te reserveren.');
      return;
    }

    fetch('http://leenplaats.test/api/reserve', {

      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        product_id: productId,
        start_date: new Date().toISOString(),
        end_date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString()
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.message && data.message.includes('succesvol')) {
          alert('Product succesvol gereserveerd!');
          fetchProducts();
        } else {
          alert(data.message || 'Reserveren mislukt');
        }
      })
      .catch(err => {
        console.error('Fout bij reserveren:', err);
        alert('Er is iets misgegaan bij het reserveren');
      });
  };

  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const filteredProducts = products
    .filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(product => (onlyAvailable ? product.is_available : true))
    .map(product => {
      let afstand = null;
      if (userLatitude && userLongitude && product.latitude && product.longitude) {
        afstand = getDistanceFromLatLonInKm(
          userLatitude,
          userLongitude,
          product.latitude,
          product.longitude
        );
      }
      return { ...product, afstand };
    })
    .sort((a, b) => {
      if (sortOption === 'price') return a.price - b.price;
      if (sortOption === 'distance' && a.afstand != null && b.afstand != null) return a.afstand - b.afstand;
      return 0;
    });

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-content">
          <svg className="loading-spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="loading-text">Producten laden...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="products-container">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Beschikbare Producten</h1>
          <p className="page-description">Ontdek wat er beschikbaar is in jouw omgeving</p>
        </div>

        {/* Filters */}
        <div className="card filters-card">
          <div className="filters-content">
            <div className="search-container">
              <div style={{ position: 'relative' }}>
                <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Zoek op productnaam..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field search-input"
                />
              </div>
            </div>

            <div className="filter-checkbox-container">
              <input
                id="available-only"
                type="checkbox"
                checked={onlyAvailable}
                onChange={(e) => setOnlyAvailable(e.target.checked)}
                className="filter-checkbox"
              />
              <label htmlFor="available-only" className="filter-label">
                Alleen beschikbaar
              </label>
            </div>

            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="sort-select"
            >
              <option value="">Sorteer op...</option>
              <option value="price">Prijs (laag naar hoog)</option>
              <option value="distance">Afstand (dichtbij eerst)</option>
            </select>
          </div>
        </div>

        {/* Producten Grid */}
        {filteredProducts.length === 0 ? (
          <div className="empty-state">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h3>Geen producten gevonden</h3>
            <p>Probeer je zoekopdracht aan te passen of voeg zelf een product toe.</p>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map(product => (
              <div key={product.id} className="card product-card">
                <div className="product-header">
                  <h3 className="product-title">{product.name}</h3>
                  <span className={`status-badge ${product.is_available ? 'available' : 'unavailable'}`}>
                    {product.is_available ? '✅ Beschikbaar' : '❌ Uitgeleend'}
                  </span>
                </div>

                {product.description && (
                  <p className="product-description">{product.description}</p>
                )}

                <div className="product-details">
                  <div className="product-detail">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                    €{product.price} per dag
                  </div>

                  {product.afstand != null && (
                    <div className="product-detail">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {product.afstand.toFixed(1)} km afstand
                    </div>
                  )}
                </div>

                {product.is_available && (
                  <button
                    onClick={() => {
                    const token = localStorage.getItem('token');
                      if (!token) {
                        navigate('/login');  // Stuur gebruiker naar login pagina
                        return;
                      }
                          reserveerProduct(product.id);
                    }}
                  className="btn-primary reserve-button"
                  >
                  Reserveren
                </button>

                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Producten;
