import React, { useEffect, useState } from 'react';
 
const Producten = () => {

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);
 
  useEffect(() => {

    // Haal de producten op van de Laravel API

    fetch('http://leenplaats.test/api/producten')

      .then(response => response.json())

      .then(data => {

        console.log(data);

        setProducts(data.producten);

        setLoading(false);

      })

      .catch(error => {

        console.error('Fout bij ophalen producten:', error);

        setLoading(false);

      });

  }, []);
 
  if (loading) {

    return <p>Producten laden...</p>;

  }
 
  return (
<div>
<h2>Producten</h2>
<ul>
  {products.map(product => (
    <li key={product.id}>

            🛒 {product.product_name} (ID: {product.product_id})
</li>

        ))}
</ul>
</div>

  );

};
 
export default Producten;

 