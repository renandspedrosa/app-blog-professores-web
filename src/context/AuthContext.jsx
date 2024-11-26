import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNavigation } from '@/context/NavigationContext';
import { decode } from 'jwt-js-decode';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

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
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
