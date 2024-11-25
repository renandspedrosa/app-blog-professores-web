import  NoPermission  from '@/components/NoPermission';
import { Link, useLocation } from 'react-router-dom';
import { useNavigation } from '@/context/NavigationContext';

const checkPermission = () => {
    const location = useLocation();
    const { authenticatedNavigation } = useNavigation();
    

    return <NoPermission />
};

export default checkPermission;
