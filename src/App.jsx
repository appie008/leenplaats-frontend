import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Home from './componenten/Home';
import Producten from './componenten/Producten';
import ProdToevoegen from './componenten/ProdToevoegen';

import './App.css';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> | <Link to="/producten">Producten</Link> | <Link to="/prodtoevoegen">Product toevoegen</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/producten" element={<Producten />} />
        <Route path="/prodtoevoegen" element={<ProdToevoegen />} />
      </Routes>
    </Router>
  );
}

export default App;
