import axios from 'axios';

const host = import.meta.env.API_HOST || 'http://localhost:3000';
const token = localStorage.getItem('authToken');

export const getTags = async (page = 1, limit = 5, search = '') => {
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