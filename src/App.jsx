import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './componenten/Home';
import Producten from './componenten/Producten';
import ProdToevoegen from './componenten/ProdToevoegen';
import Login from './componenten/Login';
import Register from './componenten/Register';
import './App.css';

function App() {
  return (
    <Router>
<nav className="navbar">
  <div className="nav-container">
    
    <div className="nav-left">
      <Link to="/" className="nav-link">Home</Link>
    </div>

    <div className="nav-right">
      <Link to="/login" className="nav-link">Inloggen</Link>
      <Link to="/register" className="nav-link">Registreren</Link>
    </div>

  </div>
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
