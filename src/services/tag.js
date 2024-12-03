import axios from 'axios';

const host = import.meta.env.VITE_API_HOST || 'http://localhost:3000';

export const getTags = async (page = 1, limit = 5, search = '') => {
  const token = localStorage.getItem('authToken');
    try {
      const response = await axios.get(`${host}/tag`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            page,
            limit,
            term: search,
          },
      }, 
    )
      return { data: response.data }
    } catch (error) {
      console.error('Erro ao buscar tags:', error)
      throw error
    }
}

export const createTag = async (tagData) => {
  try {
    const token = localStorage.getItem('authToken');
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json', 
    };

    const response = await axios.post(`${host}/tag`, tagData, { headers });

    return response.data;
  } catch (error) {
    console.error(
      'Erro ao criar tag:',
      error.response?.data || error.message
    );
    throw error;
  }
};

export const updateTag = async (tagData) => {
  try {
    const token = localStorage.getItem('authToken');
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json', 
    };

    const response = await axios.put(`${host}/tag/${tagData.id}`, tagData, { headers });

    return response.data;
  } catch (error) {
    console.error(
      'Erro ao criar tag:',
      error.response?.data || error.message
    );
    throw error;
  }
};

export const deleteTag = async (id) => {
  try {
    const token = localStorage.getItem('authToken');
    await axios.delete(`${host}/tag/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  } catch (error) {
    console.error(`Erro ao excluir categoria com id ${id}:`, error)
    throw error
  }
}