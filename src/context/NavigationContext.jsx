import { createContext, useContext } from 'react';

const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
  const availableNavigation = [
    { name: 'Login', href: '/login'},

    //não precisa de permissão para acessar, show true para visualizar no navbar
    { name: 'Postagens', href: '/', show: true  },
    { name: 'Crie seu usuário', href: '/create-account'},  
  ];
  
  const authenticatedNavigation = [
    //menus para o professor autenticado, teacher: true
    { name: 'Criar Postagens', href: '/create', show: true, teacher: true },

    //menus para usuário logado
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
