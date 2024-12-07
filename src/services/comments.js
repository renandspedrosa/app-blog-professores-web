import axios from 'axios'

const host = import.meta.env.API_HOST || 'http://localhost:3000'
const token = localStorage.getItem('authToken')

export const getPostComments = async (id) => {
  try {
    const response = await axios.get(`${host}/posts/${id}/comments`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return { data: response.data }
  } catch (error) {
    console.error(`Erro ao buscar comentários do post com id ${id}:`, error)
    throw error
  }
}
