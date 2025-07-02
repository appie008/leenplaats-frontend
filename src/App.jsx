import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './componenten/Home';
import Producten from './componenten/Producten';
import ProdToevoegen from './componenten/ProdToevoegen';
import Login from './componenten/Login';
import Register from './componenten/Register';

function App() {
  return (
    <Router>
      {/* Navigatiebalk */}
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-content">
            
            {/* Logo en hoofdnavigatie */}
            <div className="navbar-left">
              <Link to="/" className="logo">
                Leenplaats
              </Link>
              
              <div className="nav-links">
                <Link to="/" className="nav-link">
                  Home
                </Link>
                <Link to="/producten" className="nav-link">
                  Producten
                </Link>
                <Link to="/prodtoevoegen" className="nav-link">
                  Product Toevoegen
                </Link>
              </div>
            </div>

            {/* Inloggen/Registreren rechts */}
            <div className="navbar-right">
              <Link to="/login" className="nav-link">
                Inloggen
              </Link>
              <Link to="/register" className="btn-primary">
                Registreren
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/producten" element={<Producten />} />
          <Route path="/prodtoevoegen" element={<ProdToevoegen />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;