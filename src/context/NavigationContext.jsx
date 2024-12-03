import { createContext, useContext } from 'react';

const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
  const availableNavigation = [
    { name: 'Postagens', href: '/', show: true  },
    { name: 'Login', href: '/login'},
    { name: 'Crie seu usuário', href: '/create-account'},  
  ];
  
  //precisa de login para acessar
  const authenticatedNavigation = [
    //menus para o professor autenticado, teacher: true
    { name: 'Criar Postagens', href: '/create-post', show: true, teacher: false },
    { name: 'Administrar Postagens', href: '/administrador', show: true, teacher: true },

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

export const NavigationConsumer = ({ children }) => {
  return (
    <NavigationContext.Consumer>
      {(context) => children(context)}
    </NavigationContext.Consumer>
)}