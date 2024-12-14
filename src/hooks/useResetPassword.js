import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { resetPassword } from '@/services/password'
import errorsMessage from '@/utils/messageError';
import { toast } from 'react-toastify';


const useResetPassword = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [token, setToken] = useState('')
    const [formPassword, setFormPassword] = useState({
        password: '',
        confirmPassword: '',
      })

    const handleResetPassword = async (values) => {
        try {
            setLoading(true)
            await resetPassword(values, token)
            setLoading(false)
            navigate('/login', {replace: true});
            toast.success('Senha redefinida com sucesso!');
        } catch (error) {
            setLoading(false)
            console.error('Erro ao redefinir senha:', error)
            errorsMessage(error, toast);
            setError('Ocorreu um erro ao redefinir a senha.')
        }
    }

    return {
        loading,
        error,
        formPassword,
        handleResetPassword,
        setToken
    }

}

export default useResetPassword