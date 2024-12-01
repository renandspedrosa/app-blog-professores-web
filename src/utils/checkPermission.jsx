import  NoPermission  from '@/components/NoPermission';
import { useLocation } from 'react-router-dom';
import { useNavigation } from '@/context/NavigationContext';
import { useAuth } from '@/context/AuthContext';

const checkPermission = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    const { authenticatedNavigation, handleTokenExpiration } = useNavigation();    

    const { isTeacher } = useAuth();

    const link = authenticatedNavigation.find((item) => item.href === currentPath);
    if (link && link.teacher && !isTeacher) {
        return <NoPermission />;
    }
    return false;
};

export default checkPermission;
