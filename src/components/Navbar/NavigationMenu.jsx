import { Link, useLocation } from 'react-router-dom';

const NavigationMenu = ({classNames}) => {
  return (
    <div className="hidden md:block">
      <div className="ml-10 flex items-baseline space-x-4">
        {navigation.map((item) => (
          item.show && (
            <Link
              key={item.name}
              to={item.href}
              aria-current={location.pathname === item.href ? 'page' : undefined}
              className={classNames}
            >
              {item.name}
            </Link>
          )
        ))}
      </div>
    </div>
  )
}

export default NavigationMenu;