import NoPermission from '@/components/NoPermission';
import { useLocation } from 'react-router-dom';
import { useNavigation } from '@/context/NavigationContext';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';

const CheckPermission = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const { authenticatedNavigation } = useNavigation();
  const { isTeacher, handleTokenExpiration } = useAuth();

  useEffect(() => {
    handleTokenExpiration();
  }, [handleTokenExpiration]);

  const link = authenticatedNavigation.find((item) => item.href === currentPath);
  if (link && link.teacher && !isTeacher) {
    return <NoPermission />;
  }

  return null
};

export default CheckPermission;
