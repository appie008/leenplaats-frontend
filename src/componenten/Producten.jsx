import React, { useEffect, useState } from 'react';

const Producten = () => {
  const [products, setProducts] = useState([]);
  const [userLatitude, setUserLatitude] = useState(null);
  const [userLongitude, setUserLongitude] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLatitude(position.coords.latitude);
          setUserLongitude(position.coords.longitude);
          fetchProducts();
        },
        (error) => {
          console.error('Kan locatie niet ophalen:', error);
          fetchProducts(); // Producten alsnog laden, alleen zonder afstandsberekening
        }
      );
    } else {
      console.error('Geolocatie wordt niet ondersteund door deze browser.');
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
      .catch(error => {
        console.error('Fout bij ophalen producten:', error);
        setLoading(false);
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

  if (loading) {
    return <p>Producten laden...</p>;
  }

  return (
    <div>
      <h2>Producten</h2>
      <ul>
        {products.map(product => {
          let afstandText = '';

          if (userLatitude && userLongitude && product.latitude && product.longitude) {
            const afstand = getDistanceFromLatLonInKm(
              userLatitude,
              userLongitude,
              product.latitude,
              product.longitude
            ).toFixed(2);
            afstandText = ` - Afstand: ${afstand} km`;
          }

          return (
            <li key={product.id}>
              🛒 {product.name} - €{product.price}{afstandText}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Producten;
