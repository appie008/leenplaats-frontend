import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            Welkom bij <span className="highlight">Leenplaats</span>
          </h1>
          <p className="hero-description">
            De plek om eenvoudig producten te vinden, lenen of aanbieden. 
            Ontdek ons ruime aanbod of voeg zelf iets toe aan onze community.
          </p>
          
          <div className="hero-buttons">
            <Link to="/producten" className="btn-primary">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Bekijk Producten
            </Link>
            <Link to="/prodtoevoegen" className="btn-secondary" style={{backgroundColor: '#9333ea', color: 'white'}}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Product Toevoegen
            </Link>
          </div>
        </div>

        {/* Feature cards */}
        <div className="features-grid">
          <div className="card feature-card">
            <div className="feature-icon primary">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="feature-title">Zoek & Vind</h3>
            <p className="feature-description">Vind eenvoudig producten in jouw buurt met onze slimme zoekfunctie.</p>
          </div>
          
          <div className="card feature-card">
            <div className="feature-icon green">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="feature-title">Lokaal Delen</h3>
            <p className="feature-description">Deel producten met mensen in jouw omgeving en bouw een sterke community.</p>
          </div>
          
          <div className="card feature-card">
            <div className="feature-icon purple">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="feature-title">Eenvoudig Toevoegen</h3>
            <p className="feature-description">Voeg je eigen producten toe en help anderen terwijl je er zelf van profiteert.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;