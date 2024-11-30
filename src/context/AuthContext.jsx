import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNavigation } from '@/context/NavigationContext';
import { decode } from 'jwt-js-decode';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const { availableNavigation } = useNavigation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);
  const [isStudent, setISStudent] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleUserType = (token) => {
    const jwt = decode(token);
    const userType = jwt.payload.type;

    setIsTeacher(userType === 'teacher');
    setISStudent(userType === 'student');
  };

  const login = (token, userData) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData);
    handleUserType(token);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    setIsTeacher(false);
    setISStudent(false);
    setTimeout(() => {
      navigate('/');
    }, 0);
  };

  const isTokenExpired = (token) => {
    try {
      const decoded = decode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      return decoded.payload.exp < currentTime;
    } catch (error) {
      console.error("Erro ao decodificar o token:", error);
      return true;
    }
  };

  const handleTokenExpiration = () => {
    const token = localStorage.getItem('authToken');
    if (token && isTokenExpired(token)) {
      logout();
      toast.info('Sua sessão expirou, faça login novamente.');
      navigate('/login');
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('user');

    if (token && storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
      handleUserType(token);
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated && !availableNavigation) {
      navigate('/');
    }
  }, [isAuthenticated, navigate, availableNavigation]);

  const value = {
    isAuthenticated,
    isStudent,
    isTeacher,
    user,
    login,
    logout,
    handleTokenExpiration, // Passando a função de expiração do token
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const AuthConsumer = ({ children }) => {
  return (
    <AuthContext.Consumer>
      {(context) => children(context)}
    </AuthContext.Consumer>
  );
};
