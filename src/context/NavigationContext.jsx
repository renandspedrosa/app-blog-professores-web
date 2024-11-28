import { createContext, useContext } from 'react';

export const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
  //não precisa de permissão para acessar, show true para visualizar no navbar
  const availableNavigation = [
    { name: 'Login', href: '/login'},
    { name: 'Postagens', href: '/', show: true  },
    { name: 'Crie seu usuário', href: '/create-account'},  
  ];
  
  //precisa de login para acessar
  const authenticatedNavigation = [
    //menus para o professor autenticado, teacher: true
    { name: 'Criar Postagens', href: '/create', show: true, teacher: true },
    { name: 'Perfil', href: '/profile', user: true }, //menus para usuário logado
    { name: 'Configurações', href: '/settings', user: true }, //menus para usuário logado
    { name: 'Sair', href: '#', user: true}, //menus para usuário logadoå
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