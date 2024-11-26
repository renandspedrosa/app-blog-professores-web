import { createContext, useContext } from 'react';

const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
  const availableNavigation = [
    { name: 'Postagens', href: '/', show: true  },
    { name: 'Login', href: '/login'},
    { name: 'Crie seu usuário', href: '/create-account'},  
  ];
  
  const authenticatedNavigation = [
    { name: 'Criar Postagens', href: '/create-post', show: true },
    { name: 'Perfil', href: '/profile', user: true },
    { name: 'Configurações', href: '/settings', user: true },
    { name: 'Sair', href: '#', user: true},
  ];

  return (
    <NavigationContext.Provider value={{ availableNavigation, authenticatedNavigation }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation deve ser usado dentro de um NavigationProvider');
  }
  return context;
};

export default NavigationContext;
