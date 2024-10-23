import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, LogOut } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Função para alternar a visibilidade do menu
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const linkSelected = (path) => {
    return location.pathname === path 
      ? 'md:bg-transparent md:text-blue-700' 
      : 'hover:bg-gray-100 md:hover:bg-transparent dark:text-white dark:hover:bg-gray-700';
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="/assets/logo.png" className="h-8" alt="Blog Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Blog</span>
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {isAuthenticated ? (
            <button onClick={logout} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">
              Logout <LogOut strokeWidth={1.9} className="inline h-4 w-4" />
            </button>
          ) : (
            <Link to="/login" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">
              Login <LogIn strokeWidth={1.9} className="inline h-4 w-4" />
            </Link>
          )}
          <button onClick={toggleMenu} type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700" aria-controls="navbar-cta" aria-expanded={isMenuOpen}>
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>
        <div className={`hidden w-full md:flex md:w-auto md:order-1 ${isMenuOpen ? 'block' : 'hidden'}`} id="navbar-cta">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link to="/" className={`block py-2 px-3 md:p-0 text-gray-900 rounded ${linkSelected('/')}`} onClick={closeMenu}>Home</Link>
            </li>
            {/* Apenas se o usuário estiver logado */}
            {isAuthenticated && (
              <>
                <li>
                  <Link to="/admin" className={`block py-2 px-3 md:p-0 text-gray-900 rounded ${linkSelected('/admin')}`} onClick={closeMenu}>Admin</Link>
                </li>
                <li>
                  <Link to="/create" className={`block py-2 px-3 md:p-0 text-gray-900 rounded ${linkSelected('/create')}`} onClick={closeMenu}>Criar Postagem</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <ul className="flex flex-col font-medium p-4 border border-gray-100 rounded-lg bg-gray-50">
            <li>
              <Link to="/" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100" onClick={closeMenu}>Home</Link>
            </li>
            {isAuthenticated && (
              <>
                <li>
                  <Link to="/admin" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100" onClick={closeMenu}>Admin</Link>
                </li>
                <li>
                  <Link to="/create" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100" onClick={closeMenu}>Criar Post</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
