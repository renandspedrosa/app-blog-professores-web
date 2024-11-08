import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, UserCircleIcon  } from '@heroicons/react/24/outline'
import { LogIn } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://e7.pngegg.com/pngimages/81/570/png-clipart-profile-logo-computer-icons-user-user-blue-heroes-thumbnail.png',
}

const navigation = [
  { name: 'Postagens', href: '/', current: true },
]

const navigationLogado = [
  { name: 'Criar Postagens', href: '/create', current: false },
]



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export default function Navbar({children}) {
  const currentNavigationItem = navigation.find(item => item.current)
  const { isAuthenticated, logout } = useAuth();

  const userNavigation = [
    { name: 'Perfil', href: '/profile' },
    { name: 'Configurações', href: '/settings' },
    { name: 'Sair', href: '#', onClick: logout },
  ];


  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="shrink-0">
                  <img
                    alt="Your Company"
                    src="/assets/logo.png"
                    className="h-8 w-8"
                  />
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {
                    navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        aria-current={item.current ? 'page' : undefined}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium',
                        )}
                      >
                        {item.name}
                      </a>
                      ))
                    }
                    {isAuthenticated && navigationLogado.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        aria-current={item.current ? 'page' : undefined}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium',
                        )}
                      >
                        {item.name}
                      </a>
                    ))
                    }
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                {isAuthenticated ? (
                    <>
                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <MenuButton className="hover:bg-gray-700 relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            <UserCircleIcon aria-hidden="true" className="h-8 w-8  rounded-full text-gray-300" />
                          </MenuButton>
                        </div>
                        <MenuItems
                          transition
                          className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                        >
                          {userNavigation.map((item) => (
                            <MenuItem key={item.name}>
                              <a
                                href={item.href}
                                onClick={item.onClick}
                                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                              >
                                {item.name}
                              </a>
                            </MenuItem>
                          ))}
                        </MenuItems>
                      </Menu>
                    </>
                  ) : (
                    
                    <Link to="/login" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">
                      Login <LogIn  strokeWidth={1.9} className="inline h-4 w-4" />
                    </Link>
                 )}
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                {/* Mobile menu button */}
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
                  <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
                </DisclosureButton>
              </div>
            </div>
          </div>

          <DisclosurePanel className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  aria-current={item.current ? 'page' : undefined}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium',
                  )}
                >
                  {item.name}
                </DisclosureButton>
              ))}
              {isAuthenticated && navigationLogado.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  aria-current={item.current ? 'page' : undefined}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium',
                  )}
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
            
            <div className="border-t border-gray-700 pb-3 pt-4">
            {isAuthenticated && (
              <>
              <div className="flex items-center px-5">
                <div className="shrink-0">
                  <img alt="" src={user.imageUrl} className="h-10 w-10 rounded-full" />
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
                      {userNavigation.map((item) => (
                        <DisclosureButton
                          key={item.name}
                          as="a"
                          href={item.href}
                          onClick={item.onClick}
                          className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                        >
                          {item.name}
                        </DisclosureButton>
                      ))}
                    </>
                  ) : (
                    <Link to="/login" type="button" className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">
                      Login
                    </Link>
                  )}
              </div>
            </div>
          </DisclosurePanel>
        </Disclosure>

        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{ currentNavigationItem.name }</h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{ children }</div>
        </main>
      </div>
    </>
  )
}
