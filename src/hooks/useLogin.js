import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/config/axios';
import { useAuth } from '@/context/AuthContext';
import { useAlert } from 'react-alert';

const useLogin = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const alert = useAlert();
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
      alert.success('Login realizado com sucesso!');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setErrorMessage('Falha no login. Verifique suas credenciais.');
      alert.error('Falha no login.');
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
