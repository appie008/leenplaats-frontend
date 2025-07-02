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
      <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo en hoofdnavigatie */}
            <div className="flex items-center space-x-8">
              <Link to="/" className="text-2xl font-bold text-primary-600 hover:text-primary-700 transition-colors">
                Leenplaats
              </Link>
              
              <div className="hidden md:flex space-x-6">
                <Link 
                  to="/" 
                  className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Home
                </Link>
                <Link 
                  to="/producten" 
                  className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Producten
                </Link>
                <Link 
                  to="/prodtoevoegen" 
                  className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Product Toevoegen
                </Link>
              </div>
            </div>

            {/* Inloggen/Registreren rechts */}
            <div className="flex items-center space-x-4">
              <Link 
                to="/login" 
                className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Inloggen
              </Link>
              <Link 
                to="/register" 
                className="btn-primary text-sm"
              >
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