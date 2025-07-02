import React, { useEffect, useState } from 'react';
import './Producten.css';

const Producten = () => {
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
    fetch('/api/producten')
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
    // Direct de status bijwerken in de lokale state
    setProducts(prevProducts => 
      prevProducts.map(product => 
        product.id === productId 
          ? { ...product, is_available: false }
          : product
      )
    );

    // Reservering naar server sturen
    fetch('/api/reserveer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify({ product_id: productId })
    })
      .then(res => {
        if (res.ok) {
          alert('Product succesvol gereserveerd!');
          fetchProducts();
        } else {
          // Als reservering mislukt, status terugzetten
          setProducts(prevProducts => 
            prevProducts.map(product => 
              product.id === productId 
                ? { ...product, is_available: true }
                : product
            )
          );
          res.json().then(data => alert(data.message || 'Reserveren mislukt'));
        }
      })
      .catch(err => {
        console.error('Fout bij reserveren:', err);
        // Als er een fout optreedt, status terugzetten
        setProducts(prevProducts => 
          prevProducts.map(product => 
            product.id === productId 
              ? { ...product, is_available: true }
              : product
          )
        );
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
    return <p>Producten laden...</p>;
  }

  return (
    <div className="producten-container">
      <h2>Producten</h2>

      <div className="filter-container">
        <input
          type="text"
          placeholder="Zoek op productnaam"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <label>
          <input
            type="checkbox"
            checked={onlyAvailable}
            onChange={(e) => setOnlyAvailable(e.target.checked)}
          />
          Alleen beschikbare producten
        </label>
        <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          <option value="">Sorteer op...</option>
          <option value="price">Prijs</option>
          <option value="distance">Afstand</option>
        </select>
      </div>

      <div className="product-grid">
        {filteredProducts.map(product => (
          <div className="product-card" key={product.id}>
            <h3>{product.name}</h3>
            <p>Prijs: €{product.price}</p>
            <p>{product.is_available ? '✅ Beschikbaar' : '❌ Uitgeleend'}</p>
            {product.afstand != null && (
              <p>Afstand: {product.afstand.toFixed(2)} km</p>
            )}
            {product.is_available && (
              <button onClick={() => reserveerProduct(product.id)}>
                Reserveer
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Producten;