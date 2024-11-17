import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTeacher } from '@/services/teacher';
import { createStudent } from '@/services/student';
import errorsMessage from '@/utils/messageError';
import { toast } from 'react-toastify';

const useCreateAccountForm = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formUser, setFormUser] = useState({
        typeUser: '1', 
        name: '', 
        email: '', 
        password: '', 
        confirmPassword: ''
    });

    const handleChange = (field, value) => {
        setFormUser(prevState => ({
            ...prevState,
            [field]: value,
        }));
    };

    const handleCreateUser = async (values) => {
        try {
            setLoading(true);
            if (values.typeUser === '1') {
                await createTeacher(values);
            } else if (values.typeUser === '2') {
                await createStudent(values);
            }

            setLoading(false);
            navigate('/login', { replace: true });
            toast.success('Usuário criado com sucesso!');
        } catch (error) {
            setLoading(false);
            errorsMessage(error, toast);
        }
    };

    return {
        loading,
        formUser,
        handleChange,
        handleCreateUser,
    };
};

export default useCreateAccountForm;
