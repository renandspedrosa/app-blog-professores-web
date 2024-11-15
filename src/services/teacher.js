import api from '@/config/axios';

export const createTeacher = async (param) => {
  try {
    const response = await api.post(`/teacher`, param, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Erro ao criar professor:', error.response ? error.response.data : error.message);
    throw error;
  }
};
