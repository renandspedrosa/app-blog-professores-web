import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { useNavigation } from '@/context/NavigationContext';
import { useAuth } from '@/context/AuthContext';
import { LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getNavigation } from '@/utils/getNavigation';

const ProfileMenu = ({ isMobile }) => {
  
  const { availableNavigation, authenticatedNavigation } = useNavigation();
  const { user, isAuthenticated, isTeacher, logout } = useAuth();
  
  const navigation = getNavigation({
    isAuthenticated,
    isTeacher,
    availableNavigation,
    authenticatedNavigation,
  });
  if (isMobile) {
    return (
      <div className="border-t border-gray-700 pb-3 pt-4">
        {isAuthenticated && (
          <>
          <div className="flex items-center px-5">
            <div className="shrink-0">
              <img alt="" src={'/assets/user.png'} className="h-10 w-10 rounded-full" />
            </div>
            <div className="ml-3">
              <div className="text-base/5 font-medium text-white">{user.name}</div>
              <div className="text-sm font-medium text-gray-400">{user.email}</div>
            </div>
          </div>
          </>
        )}
          <div className="mt-3 space-y-1 px-2">
          {isAuthenticated ? (
            <>
              {navigation.map((item) => (
                item.user && (
                  <Link
                    key={item.name}
                    as="a"
                    to={item.href}
                    onClick={item.name == 'Sair' && ( logout) }
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                  >
                    {item.name}
                  </Link>
                )
              ))}
            </>
          ) : (
            <Link to="/login" type="button" className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">
              Login
            </Link>
          )}
          </div>
      </div>
    )
  } else {
    return (
      <div className="hidden md:block">
        <div className="ml-4 flex items-center md:ml-6">
          {isAuthenticated ? (
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="hover:bg-gray-700 relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <UserCircleIcon aria-hidden="true" className="h-8 w-8 rounded-full text-gray-300" />
                </MenuButton>
              </div>
              <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none">
                {navigation.map((item) => (
                  item.user && (
                    <MenuItem key={item.name}>
                      <Link to={item.href} onClick={item.name == 'Sair' && ( logout) } className="block px-4 py-2 text-sm text-gray-700">
                        {item.name}
                      </Link>
                    </MenuItem>
                  )
                ))}
              </MenuItems>
            </Menu>
          ) : (
            <Link
              to="/login"
              type="button"
              className="rounded-md bg-indigo-600 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 font-medium text-sm px-4 py-2"
            >
              Login <LogIn strokeWidth={1.9} className="inline h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    )
  }
  
  
}
  
export default ProfileMenu;
