import api from '@/config/axios'
import axiosInstance from '../config/axiosInstance'

const host = import.meta.env.VITE_API_HOST || 'http://localhost:3000'

export const getTags = async (page = 1, limit = 5, search = '') => {
  try {
    const response = await api.get(`/tag`, {
      params: {
        page,
        limit,
        term: search,
      },
    })
    return { data: response.data }
  } catch (error) {
    console.error('Erro ao buscar tags:', error)
    throw error
  }
}

export const createTag = async (tagData) => {
  try {
    const response = await axiosInstance.post(`${host}/tag`, tagData)

    return response.data
  } catch (error) {
    console.error('Erro ao criar tag:', error.response?.data || error.message)
    throw error
  }
}

export const updateTag = async (tagData) => {
  try {
    const response = await axiosInstance.put(
      `${host}/tag/${tagData.id}`,
      tagData,
    )
    return response.data
  } catch (error) {
    console.error('Erro ao criar tag:', error.response?.data || error.message)
    throw error
  }
}

export const deleteTag = async (id) => {
  try {
    await axiosInstance.delete(`${host}/tag/${id}`)
  } catch (error) {
    console.error(`Erro ao excluir categoria com id ${id}:`, error)
    throw error
  }
}
