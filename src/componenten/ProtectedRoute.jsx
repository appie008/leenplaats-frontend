import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    // Gebruiker niet ingelogd -> stuur naar loginpagina
    return <Navigate to="/login" replace />;
  }

  // Gebruiker is ingelogd -> toon de gewenste pagina
  return children;
};

export default ProtectedRoute;
