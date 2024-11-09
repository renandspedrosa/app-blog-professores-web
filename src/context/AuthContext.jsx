import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useNavigation } from '@/context/NavigationContext';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const { availableNavigation } = useNavigation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const login = (token) => {
    localStorage.setItem('authToken', token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);
  useEffect(() => {
    if (!isAuthenticated) {
      if (!availableNavigation.some((nav) => nav.href === location.pathname)) {
        navigate('/');
      }
    }
      
  }, [isAuthenticated, navigate]);

  const value = {
    isAuthenticated,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
