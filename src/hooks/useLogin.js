import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/config/axios';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'react-toastify';

const useLogin = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const response = await api.post('/user/signin', credentials);
      const token = response.data.token;
      const user = response.data.user;
      login(token, user);
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setErrorMessage('Falha no login. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  return {
    credentials,
    setCredentials,
    errorMessage,
    loading,
    handleLogin,
  };
};

export default useLogin;
