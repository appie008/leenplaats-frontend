import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './componenten/Home';
import Producten from './componenten/Producten';
import ProdToevoegen from './componenten/ProdToevoegen';
import Login from './componenten/login'; // Fixed casing to match actual filename
import Register from './componenten/Register';



function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> | <Link to="/producten">Producten</Link> | <Link to="/prodtoevoegen">Product toevoegen</Link> | <Link to="/login">Inloggen</Link> | <Link to="/register">Registreren</Link>

      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/producten" element={<Producten />} />
        <Route path="/prodtoevoegen" element={<ProdToevoegen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;