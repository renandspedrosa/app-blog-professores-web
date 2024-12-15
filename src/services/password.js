import api from '@/config/axios';

export const sendResetPassword = async (param) => {
  try {
    const response = await api.post(`/user/forgot-password`, param, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Erro ao criar enviar e-mail:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const resetPassword = async (param, token) => {
  try {
    const response = await api.post(`/user/reset-password/${token}`, param, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error.response ? error.response.data : error.message);
    throw error;
  }
};
  
