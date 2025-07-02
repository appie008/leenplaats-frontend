import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Welkom bij Leenplaats!</h1>
        <p>De plek om eenvoudig producten te vinden, lenen of aanbieden. Ontdek ons ruime aanbod of voeg zelf iets toe.</p>
        <div className="button-container">
          <a href="/producten" className="home-button">Bekijk Producten</a>
          <a href="/prodtoevoegen" className="home-button purple">Product Toevoegen</a>
        </div>
      </div>
    </div>
  );
}

export default Home;