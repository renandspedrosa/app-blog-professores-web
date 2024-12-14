import { useState } from 'react'
import { sendResetPassword } from '@/services/password'
import errorsMessage from '@/utils/messageError';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const useResetPassword = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    
    const sendEmail = async (formEmail) => {
        try {
            setLoading(true)
            await sendResetPassword(formEmail)
            setLoading(false)
            navigate('/login', {replace: true});
            toast.success('E-mail de recuperação de senha enviado!');
        } catch (error) {
            setLoading(false)
            console.error('Erro ao enviar e-mail:', error)
            errorsMessage(error, toast);
            setError('Ocorreu um erro ao enviar o e-mail.')
        }
    }
    
    return {
        loading,
        error,
        sendEmail,
    }
}

export default useResetPassword