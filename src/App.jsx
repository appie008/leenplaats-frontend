import { useState,useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Home from './componenten/Home';
import Producten from './componenten/Producten';

import './App.css'
 
function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> | <Link to="/producten">Producten</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/producten" element={<Producten />} />
      </Routes>
    </Router>
)};
 
export default App;