import { Link } from 'react-router-dom';

const NavigationMenu = ({ navigation, location, isMobile }) => {

  const classNames = (...classes) => classes.filter(Boolean).join(' ');

  return (
    <div className={isMobile ? 'space-y-1 px-2 pb-3 pt-2 sm:px-3' : 'hidden md:block'}>
      <div className={isMobile ? '' : 'ml-10 flex items-baseline space-x-4'}>
        {navigation.map(
          (item) =>
            item.show && (
              <Link
                key={item.name}
                to={item.href}
                aria-current={location.pathname === item.href ? 'page' : undefined}
                className={classNames(
                  location.pathname === item.href
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  isMobile
                    ? 'block rounded-md px-3 py-2 text-base font-medium'
                    : 'rounded-md px-3 py-2 text-sm font-medium'
                )}
              >
                {item.name}
              </Link>
            )
        )}
      </div>
    </div>
  );
};

export default NavigationMenu;
