import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import NoPermission from '@/components/NoPermission';

const checkPermission = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    const { authenticatedNavigation, handleTokenExpiration, isTeacher } = useAuth();

    useEffect(() => {
        handleTokenExpiration(); // Verifica se o token expirou
    }, [handleTokenExpiration]);

    const link = authenticatedNavigation.find((item) => item.href === currentPath);
    if (link && link.teacher && !isTeacher) {
        return <NoPermission />;
    }

    return false;
};

export default checkPermission;
