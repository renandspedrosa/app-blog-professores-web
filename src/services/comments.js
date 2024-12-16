// import axios from 'axios'
import axiosInstance from '../config/axiosInstance'

const host = import.meta.env.API_HOST || 'http://localhost:3000'
const token = localStorage.getItem('authToken')

export const getPostComments = async (id, page = 1, limit = 15) => {
  try {
    const response = await axiosInstance.get(`${host}/posts/${id}/comments`, {
      params: {
        page,
        limit,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    console.error(`Erro ao buscar comentários do post com id ${id}:`, error)
    throw error
  }
}

export const createComment = async (postId, content) => {
  try {
    const response = await axiosInstance.post(`${host}/comments/${postId}`, {
      content,
    })
    return { data: response.data }
  } catch (error) {
    console.error(`Erro ao criar comentário no post com id ${postId}:`, error)
    throw error
  }
}

export const deleteComment = async (id) => {
  try {
    await axiosInstance.delete(`${host}/comments/${id}`)
    console.log('CHAMA O DELETE')
  } catch (error) {
    console.error(`Erro ao deletar comentário com id ${id}:`, error)
    throw error
  }
}
