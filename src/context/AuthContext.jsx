import { createContext, useContext, useState, useEffect } from 'react';

// Cria o contexto de autenticação
const AuthContext = createContext();

// Função para acessar o contexto de autenticação
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Função de login que simula a autenticação
  const login = (token) => {
    localStorage.setItem('authToken', token); // Armazena o token no localStorage
    setIsAuthenticated(true);
  };

  // Função de logout
  const logout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  };

  // Verifica se o usuário está autenticado no carregamento do app
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // Valores e funções que estarão disponíveis para os componentes filhos
  const value = {
    isAuthenticated,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
