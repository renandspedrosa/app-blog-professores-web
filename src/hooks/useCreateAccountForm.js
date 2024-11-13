import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTeacher } from '@/services/teacher';
import { createStudent } from '@/services/student';
import errorsMessage from '@/utils/messageError';
import { useAlert } from "react-alert";

const useCreateAccountForm = () => {
    const alert = useAlert();
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

    const handleCreateUser = async () => {
        try {
            setLoading(true);

            if (formUser.password !== formUser.confirmPassword) {
                alert.info('Senhas não conferem!');
                setLoading(false);
                return;
            }

            if (formUser.typeUser === '1') {
                await createTeacher(formUser);
            } else if (formUser.typeUser === '2') {
                await createStudent(formUser);
            } else {
                alert.info('Tipo de usuário inválido!');
                setLoading(false);
                return;
            }

            setLoading(false);
            navigate('/login', { replace: true });
            alert.success('Usuário criado com sucesso!');
        } catch (error) {
            setLoading(false);
            errorsMessage(error, alert);
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
